module.exports = (sequelize, DataType) => {
    const model = sequelize.define("FuncaoCadastrada", {
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
