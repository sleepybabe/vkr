var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    // origin: 'http://localhost:4200',
    origin: "*", 
    credentials: true, 
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js');
db.sequelize.sync({force: false}); //true - меняются (пересоздаются) таблицы в бд, false - неизменно.


var extension = require('./app/route/extension.route.js');
extension(app);
var criterion = require('./app/route/criterion.route.js');
criterion(app);
var lab_criterion = require('./app/route/lab_criterion.route.js');
lab_criterion(app);
var lab = require('./app/route/lab.route.js');
lab(app);

const port = 3000;
app.listen(port);