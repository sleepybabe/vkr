const db = require('../config/db.config.js');

//получение всех критерий для лабораторной работы по ее id
exports.getCriteriaForLab = (req, res) => {
    const lab_id = req.params.id;

    db.sequelize.query(
        `SELECT lab_criterion.id, lab_criterion.criterion_id, criterion.name, criterion.description, lab_criterion.index_number, lab_criterion.procent, lab_criterion.variant FROM lab_criterion
        JOIN criterion ON lab_criterion.criterion_id = criterion.id
        WHERE lab_criterion.lab_id = ?
        ORDER BY lab_criterion.index_number`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [lab_id] 
        })
        .then(results => {
            return res.status(200).send(results);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('server error');
        });
};

//обновление критерия лабораторной работы по id
exports.updateLabCriterion = (req, res) => {
    db.lab_criterion.update({
        procent: req.body.procent,
        index_number: req.body.index_number,
        variant: req.body.variant
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

//добавление критериев для лабораторной работы (вместе с удалением, если это было запрошено)
exports.addLabCriteria = async (req, res) => {
    const { selectedCriteria } = req.body;
    const { id: lab_id } = req.params;

    try {
        const currentCriteria = await db.lab_criterion.findAll({
            where: { lab_id },
            attributes: ['criterion_id'],
            raw: true,
        });
        
        const currentCriteriaSet = new Set(currentCriteria.map(c => c.criterion_id));
        const criteriaToAdd = [];
        const criteriaToRemove = [];

        selectedCriteria.forEach(criterion_id => {
            if (!currentCriteriaSet.has(criterion_id)) {
                criteriaToAdd.push([lab_id, criterion_id]);
            }

        currentCriteriaSet.delete(criterion_id);
        });


        currentCriteriaSet.forEach(criterion_id => {
            criteriaToRemove.push(criterion_id);
        });

        if (criteriaToAdd.length > 0) {
            await db.sequelize.query(
                `INSERT INTO lab_criterion (lab_id, criterion_id)
                VALUES ?`,
                {
                    type: db.sequelize.QueryTypes.INSERT,
                    replacements: [criteriaToAdd],
                }
            );
        }

        if (criteriaToRemove.length > 0) {
            await db.sequelize.query(
                `DELETE FROM lab_criterion
                WHERE lab_id = ? AND criterion_id IN (?)`,
                {
                    type: db.sequelize.QueryTypes.DELETE,
                    replacements: [lab_id, criteriaToRemove],
                }
            );
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send('server error');
    }
};

//получение всех критерий, которые не присутствуют в лабораторной работе
exports.getCriteriaNotForLab = (req, res) => {
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
};