module.exports = (sequelize, DataType) => {
    const model = sequelize.define("Recomendacao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nota: {
            type: DataType.INTEGER
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, { freezeTableName: true });

    model.associate = (models) => {
        model.belongsTo(models.Servidor, { as: 'servidor' });
    };

    return model;
};
