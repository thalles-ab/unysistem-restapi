module.exports = (sequelize, DataType) => {
    const Publicacao = sequelize.define("Publicacao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        local: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ano: {
            type: DataType.INTEGER,
            allowNull: false
        },
        tipo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, { freezeTableName: true });

    Publicacao.associate = (models) => {
        Publicacao.belongsTo(models.Servidor, { as: 'servidor' });
    };


    return Publicacao;
};
