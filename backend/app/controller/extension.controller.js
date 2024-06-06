const db = require('../config/db.config.js');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

//генерация и загрузка расширения
exports.download = (req, res) => { 
    const dir = path.resolve(__dirname, '../');
    const id = [];
    const module = [];
    const labs = req.body.selectedLabs;

    labs.forEach(lab => {
        const splitedTmp = lab.split(', ');
        id.push(splitedTmp[0]);
        module.push(splitedTmp[1]);
    });

    const archive = archiver('zip', { zlib: { level: 9 } });
    res.attachment('extension.zip');
    archive.pipe(res);

    db.sequelize.query(
        `SELECT criterion.name, criterion.code, criterion.comment, lab.domic_lab_id, lab.module, lab_criterion.index_number, lab_criterion.variant, lab_criterion.procent FROM lab_criterion
        JOIN criterion ON lab_criterion.criterion_id = criterion.id
        JOIN lab ON lab_criterion.lab_id = lab.id
        WHERE lab.domic_lab_id IN (?) AND lab.module IN (?)
        ORDER BY lab.module, lab.domic_lab_id, lab_criterion.index_number`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [id, module] 
        })
        .then(results => {
            const lab = {};
            const additionCode = fs.readFileSync(path.join(dir, 'addition.js'), 'utf8');
            var indexVariant = 0;
            const processedIndexes = new Set();

            results.forEach((result) => {
                const labId = result.domic_lab_id;
                const moduleLab = result.module; 
                const index = result.index_number;

                if (!lab[moduleLab]) {
                    lab[moduleLab] = {};
                }
                if (!lab[moduleLab][labId]) {
                    lab[moduleLab][labId] = [];
                    indexVariant = 0;
                }

                const functionName = `checkCriterion${index}`;
                var functionCode = '';
                const codeInFunction = `{\n${result.code}\n\t\treturn ['${index} задание (${result.name}): не выполнено.', '${result.comment}']\n\telse\n\t\treturn ['${index} задание (${result.name}): выполнено', 'Процент:', '${result.procent}']\n}\n`
                if (result.variant === 1) {
                    indexVariant++;
                    const variantFunctionName = `checkVariantCriterion${index}`;
                    const variantFunctionCode = `function ${variantFunctionName}() ${codeInFunction}`;
                    const variantFileName = `tests/${moduleLab}/variants/lab${labId}/variant${indexVariant}.js`;
                    functionCode = `async function ${functionName}() {\n\t${variantFunctionName}();\n}`;
                    const variantCode = `${variantFunctionCode}`;
                    archive.append(variantCode, { name: variantFileName });
                } else {
                    functionCode = `async function ${functionName}() ${codeInFunction}`;
                }

                if (processedIndexes.has(`${index}_${moduleLab}_${labId}`)) {
                    return;
                }

                lab[moduleLab][labId].push({
                    index: index,
                    functionName: functionName,
                    functionCode: functionCode,
                    comment: result.comment,
                    name: result.name,
                    variant: result.variant
                });

                processedIndexes.add(`${index}_${moduleLab}_${labId}`); 
            });

            Object.keys(lab).forEach(moduleLab => {
                Object.keys(lab[moduleLab]).forEach(labId => {
                    const baseFileName = `tests/${moduleLab}/lab${labId}.js`;
                    const baseFunctions = lab[moduleLab][labId].map(item => item.functionCode).join('\n');
                    const checkFunctions = lab[moduleLab][labId].map(item => item.functionName).join(',\n\t');

                    const fullCode = `${baseFunctions}\n\n${additionCode}\n\ncheckCriteria(\n\t${checkFunctions}\n);`;
                    archive.append(fullCode, { name: baseFileName });
                });
            });

            const filesToInclude = [
                { name: 'background.js', path: path.join(dir, 'background.js') },
                { name: 'manifest.json', path: path.join(dir, 'manifest.json') },
                { name: 'popup.html', path: path.join(dir, 'popup.html') },
                { name: 'popup.js', path: path.join(dir, 'popup.js') },
                { name: 'override.js', path: path.join(dir, 'override.js') }
            ];

            filesToInclude.forEach(file => {
                archive.append(fs.createReadStream(file.path), { name: file.name });
            });

            archive.finalize();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};