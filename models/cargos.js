module.exports = (sequelize, DataType) => {
    const Cargo = sequelize.define("Cargo", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cargo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        orgao: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        atual: {
            type: DataType.Boolean,
            allowNull: false
        },
        dataInicio: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: false
        },
        dataFim: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: false
        }
    }, { freezeTableName: true });

    Cargo.associate = (models) => {
        Cargo.belongsTo(models.Servidor, { as: 'servidor' });
    };


    return Cargo;
};
