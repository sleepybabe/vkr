var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var archiver = require('archiver');
var fs = require('fs');
var { Op } = require("sequelize");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); 

var db = require('./config/db.config.js');
db.sequelize.sync({force: false}); //true - меняются (пересоздаются) таблицы в бд, false - неизменно.


app.get('/download/:id', (req, res) => {
    const id = req.params.id;
    const archive = archiver('zip', { zlib: { level: 9 } });

    res.attachment('extension.zip');
    archive.pipe(res);

    db.sequelize.query(
        `SELECT criterion.code FROM lab_criterion
        JOIN criterion ON lab_criterion.criterion_id = criterion.id
        JOIN lab ON lab_criterion.lab_id = lab.id
        WHERE lab.domic_lab_id=? ORDER BY lab_criterion.index_number`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [id] 
        })
        .then(results => {
            const fullCode = results.map(result => result.code).join('\n');
            const pathBackground = `${__dirname}/background.js`;
            const pathManifest = `${__dirname}/background.js`;
            const pathPopupHtml = `${__dirname}/background.js`;
            const pathPopupJs = `${__dirname}/background.js`;
            archive.append(fs.createReadStream(pathBackground), { name: `background.js`});
            archive.append(fs.createReadStream(pathManifest), { name: `manifest.json`});
            archive.append(fs.createReadStream(pathPopupHtml), { name: `popup.html`});
            archive.append(fs.createReadStream(pathPopupJs), { name: `popup.js`});
            archive.append(fullCode, { name: `tests/html/lab${id}.js`});
            archive.finalize();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
});

// app.get('/getTest', (req, res) => {
//     const id = req.query.id;
//     const path = `${__dirname}/tests/html/lab${id}.js`;

//     res.sendFile(path, (error) => {
//         if (error) {
//             console.error(error);
//         }
//     });
// });

const port = 3000;
app.listen(port);