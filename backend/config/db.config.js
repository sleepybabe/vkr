var dbProperties = {
    database: 'test_extension',
    username: 'root', 
    password: '', 
    host: 'localhost',
    dialect: 'mysql', //СУБД
    pool: { //параметры соединения
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000 
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lab = require('../model/lab.model.js')(sequelize, Sequelize);
db.criterion = require('../model/criterion.model.js')(sequelize, Sequelize);
db.lab_criterion = require('../model/lab_criterion.model.js')(sequelize, Sequelize);

Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db;