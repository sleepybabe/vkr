var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var archiver = require('archiver');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    // origin: 'http://localhost:4200',
    origin: "*", 
    credentials: true, 
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

var db = require('./config/db.config.js');
db.sequelize.sync({force: false}); //true - меняются (пересоздаются) таблицы в бд, false - неизменно.


app.post('/download', (req, res) => {
    var id = [];
    var module = [];
    const labs = req.body.selectedLabs;
    labs.forEach(lab => {
        var splitedTmp = lab.split(',');
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
                console.log(labId, moduleLab, index)
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

            console.log(checkCriteria)
            const pathAddition = `${__dirname}/addition.js`;
            const additionCode = fs.readFileSync(pathAddition);
            index = 0;

            Object.keys(lab).forEach(moduleLab => {
                Object.keys(lab[moduleLab]).forEach(labId => {
                    const fullCode = lab[moduleLab][labId] + additionCode + checkCriteria[index];
                    archive.append(fullCode, {name: `tests/${moduleLab}/lab${labId}.js`});
                    index++;
                });
            });

            const pathBackground = `${__dirname}/background.js`;
            const pathManifest = `${__dirname}/manifest.json`;
            const pathPopupHtml = `${__dirname}/popup.html`;
            const pathPopupJs = `${__dirname}/popup.js`;

            archive.append(fs.createReadStream(pathBackground), {name: `background.js`});
            archive.append(fs.createReadStream(pathManifest), {name: `manifest.json`});
            archive.append(fs.createReadStream(pathPopupHtml), {name: `popup.html`});
            archive.append(fs.createReadStream(pathPopupJs), {name: `popup.js`});

            archive.finalize();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
});

app.get('/api/getLabs', (req, res) => {
    db.lab.findAll()
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
});

app.get('/api/getCriteriaNotForLab/:param', (req, res) => {
    const params = req.params.param.split('_');
    const domic_lab_id = params[0];
    const moduleLab = params[1];
    
    db.sequelize.query(
        `SELECT * FROM criterion WHERE criterion.id NOT IN
            (SELECT criterion_id FROM lab_criterion
            JOIN lab ON lab_criterion.lab_id = lab.id
            WHERE lab.domic_lab_id = ? AND lab.module = ?)`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [domic_lab_id, moduleLab] 
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
});

app.get('/api/getCriterion/:id', (req, res) => {
    const id = req.params.id;
    
    db.sequelize.query(
        `SELECT * FROM criterion WHERE id = ?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [id] 
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
});

const port = 3000;
app.listen(port);