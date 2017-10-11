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
            type: DataType.INTEGER,
            allowNull: true
        },
    }, { freezeTableName: true });

    model.associate = (models) => {
        model.belongsTo(models.Servidor, { as: 'servidor' });
    };

    return model;
};
