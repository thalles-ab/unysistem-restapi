module.exports = (sequelize, DataType) => {
    const Orgao = sequelize.define("Orgao", {
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
        sigla: {
            type: DataType.STRING
        }
    }, { freezeTableName: true });


    return Orgao;
};
