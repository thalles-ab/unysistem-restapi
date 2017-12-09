module.exports = (sequelize, DataType) => {
    const model = sequelize.define("Habilidade", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        numRecomendacoes: {
            type: DataType.VIRTUAL(DataType.INTEGER),
            defaultValue: 0
        },
        recomendado: {
            type: DataType.VIRTUAL(DataType.BOOLEAN),
            defaultValue: false
        },
    }, { freezeTableName: true });

    model.associate = (models) => {
        model.belongsTo(models.Servidor, { as: 'servidor' });
        model.hasMany(models.Recomendacao, { as: 'recomendacao', foreignKey: 'habilidade_id', onDelete: 'cascade' });
    };

    return model;
};
