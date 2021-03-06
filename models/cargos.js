module.exports = (sequelize, DataType) => {
    const Cargo = sequelize.define("Cargo", {
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
        atual: {
            type: DataType.BOOLEAN,
            allowNull: false
        },
        dataInicio: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: false
        },
        dataFim: {
            type: DataType.DATE,
            allowNull: true,
            defaultValue: false
        }
    }, { freezeTableName: true });

    Cargo.associate = (models) => {
        Cargo.belongsTo(models.Servidor, { as: 'servidor' });
        Cargo.belongsTo(models.Orgao, { as: 'orgao' });
        Cargo.belongsTo(models.Setor, { as: 'setor' });
    };


    return Cargo;
};
