const db = require('../config/db.config.js');

//получение всех лабораторных работ
exports.getLabs = (req, res) => {
    db.sequelize.query(
        `SELECT * FROM lab ORDER BY domic_lab_id, lab.module`,
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

//удаление лабораторной работы по id
exports.geleteLab = (req, res) => {
    db.lab.destroy({
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

//добавление лабораторной работы
exports.addLab = (req, res) => {
    db.lab.create({
        domic_lab_id: req.body.domic_lab_id,
        module: req.body.module,
        name: req.body.name
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

exports.updateLab = (req, res) => {
    db.lab.update({
        domic_lab_id: req.body.domic_lab_id,
        module: req.body.module,
        name: req.body.name
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