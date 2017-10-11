module.exports = (sequelize, DataType) => {
    const model = sequelize.define("CargoCadastrado", {
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
        }
    }, { freezeTableName: true });

    return model;
};
