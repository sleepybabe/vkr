module.exports = (sequelize, Sequelize) => {
    var Lab = sequelize.define(
        'lab',
        {
            id: {
                type: Sequelize.INTEGER(10), 
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false
            },
            domic_lab_id: {
                type:Sequelize.INTEGER(10),
                allowNull: false
            },
            module: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        });

    Lab.associate = (models) => { 
        Lab.hasMany(models.lab_criterion, {
            foreignKey: 'lab_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Lab;
};