const db = require('../config/db.config.js');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// var User = db.user;
// var Planning = db.planning;
// var Location = db.location;
// var UserPlanning = db.user_planning;
// var globalFunctions = require('../config/global.functions.js');


//генерация и загрузка расширения
exports.download = (req, res) => { 

    const dir = path.resolve(__dirname, '../');
    var id = [];
    var module = [];
    const labs = req.body.selectedLabs;

    labs.forEach(lab => {
        var splitedTmp = lab.split(', ');
        id.push(splitedTmp[0]);
        module.push(splitedTmp[1]);
    });

    const archive = archiver('zip', {zlib: {level: 9}});
    res.attachment('extension.zip');
    archive.pipe(res);

    db.sequelize.query(
        `SELECT criterion.code, criterion.comment, lab.domic_lab_id, lab.module, lab_criterion.index_number FROM lab_criterion
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
            var codeComment = '';
            var index = null;
            var criteriaFunctions = [];
            var checkCriteria = [];

            results.forEach((result) => {
                const labId = result.domic_lab_id;
                const moduleLab = result.module; 
               
                index = result.index_number;
                codeComment = `\t\treturn "${index} задание: не выполнено. Ошибка: ${result.comment}"\n`
                                + `\telse return "${index} задание: выполнено;"\n}\n`;
                if (!lab[moduleLab])
                    lab[moduleLab] = {};
                if (!lab[moduleLab][labId]){
                    
                    lab[moduleLab][labId] = '';
                    criteriaFunctions.push([]);

                }
                lab[moduleLab][labId] += `function checkCriterion${index}() {\n`
                                     + '\t'+ result.code + '\n' + codeComment +'\n';
                criteriaFunctions[criteriaFunctions.length-1].push(`checkCriterion${index}`);
            });

            criteriaFunctions.forEach(criterion => {
                checkCriteria.push(`checkCriteria(${criterion})`);
            });

            const pathAddition = path.join(dir, 'addition.js');
            const additionCode = fs.readFileSync(pathAddition);
            index = 0;

            Object.keys(lab).forEach(moduleLab => {
                Object.keys(lab[moduleLab]).forEach(labId => {
                    const fullCode = lab[moduleLab][labId] + additionCode + checkCriteria[index];
                    archive.append(fullCode, {name: `tests/${moduleLab}/lab${labId}.js`});
                    index++;
                });
            });

            const pathBackground = path.join(dir, 'background.js');
            const pathManifest = path.join(dir, 'manifest.json');
            const pathPopupHtml = path.join(dir, 'popup.html');
            const pathPopupJs = path.join(dir, 'popup.js');
            const pathOverride = path.join(dir, 'override.js');

            archive.append(fs.createReadStream(pathBackground), {name: `background.js`});
            archive.append(fs.createReadStream(pathManifest), {name: `manifest.json`});
            archive.append(fs.createReadStream(pathPopupHtml), {name: `popup.html`});
            archive.append(fs.createReadStream(pathPopupJs), {name: `popup.js`});
            archive.append(fs.createReadStream(pathOverride), {name: `override.js`});

            archive.finalize();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};