module.exports = (sequelize, DataType) => {
    const model = sequelize.define("Recomendacao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, { freezeTableName: true });

    model.associate = (models) => {
        model.belongsTo(models.Servidor, { as: 'servidor' });
        model.belongsTo(models.Habilidade, { as: 'habilidade' });
    };

    return model;
};