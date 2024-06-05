module.exports = (sequelize, Sequelize) => {
    var LabCriterion = sequelize.define(
        'lab_criterion', 
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            lab_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            criterion_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            index_number: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            procent: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            variant: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            }
        });

    LabCriterion.associate = (models) =>  {
        LabCriterion.belongsTo(models.lab, { //связь с lab
            foreignKey: 'lab_id'
        });

        LabCriterion.belongsTo(models.criterion, { //связь с criterion
            foreignKey: 'criterion_id'
        });
    };
    return LabCriterion;
};