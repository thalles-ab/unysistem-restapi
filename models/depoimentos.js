module.exports = (sequelize, DataType) => {
    const model = sequelize.define("Depoimento", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false
        },
        verificado: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, { freezeTableName: true });

    model.associate = (models) => {
        model.belongsTo(models.Servidor, { as: 'servidor' });
        model.belongsTo(models.Servidor, { as: 'criador' });
    };

    return model;
};
