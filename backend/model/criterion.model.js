module.exports = (sequelize, Sequelize) => {
    var Criterion = sequelize.define(
        'criterion',
        {
            id: {
                type: Sequelize.INTEGER(10), 
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            code: {
                type: Sequelize.STRING(500),
                allowNull: false
            }
            
        });

    Criterion.associate = (models) => { 
        Criterion.hasMany(models.lab_criterion, {
            foreignKey: 'criterion_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Criterion;
};