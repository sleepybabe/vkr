const db = require('../config/db.config.js');

//получение всех критерий
exports.getCriteria = (req, res) => {
    db.sequelize.query(
        `SELECT * FROM criterion`,
        {
            type: db.sequelize.QueryTypes.SELECT,
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

//удаление критерия по id
exports.deleteCriterion = (req, res) => {
    db.criterion.destroy({
        where: {
            id: req.params.id
        }
        })
        .then(() => {
            return res.status(200).send();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

//добавление критерия
exports.addCriterion = (req, res) => {
    db.criterion.create({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        comment: req.body.comment
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

//обновление критерия по id
exports.updateCriterion = (req, res) => {
    db.criterion.update({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        comment: req.body.comment
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

//получение критерия по id
exports.getCriterionById = (req, res) => {
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
};
