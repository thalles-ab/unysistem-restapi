module.exports = (sequelize, DataType) => {
    const Certificacao = sequelize.define("Certificacao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        entidade: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nomeCurso: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        anoFim: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: false
        }
    }, { freezeTableName: true });

    Certificacao.associate = (models) => {
        Certificacao.belongsTo(models.Servidor, { as: 'servidor' });
    };
    return Certificacao;
};
