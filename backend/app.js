const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); 

// app.get('/getTest', (req, res) => {
//     const id = req.query.id;
//     const path = `${__dirname}/tests/html/lab${id}.js`;

//     res.sendFile(path, (error) => {
//         if (error) {
//             console.error(error);
//         }
//     });
// });

var db = require('./config/db.config.js');
db.sequelize.sync({force: false}); //true - меняются (пересоздаются) таблицы в бд, false - неизменно.

const port = 3000;
app.listen(port);