module.exports = (sequelize, DataType) => {
    const Funcao = sequelize.define("Funcao", {
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
        dataInicio: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: false
        },
        dataFim: {
            type: DataType.DATE,
            allowNull: true,
            defaultValue: false
        },
        descricao: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        atual: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    }, { freezeTableName: true });

    Funcao.associate = (models) => {
        Funcao.belongsTo(models.Servidor, { as: 'servidor' });
        Funcao.belongsTo(models.Orgao, { as: 'orgaoFuncao', foreignKey: {
    name: 'orgao_id',
    allowNull: false
  } });
        Funcao.belongsTo(models.Setor, { as: 'setorFuncao', foreignKey: {
    name: 'setor_id',
    allowNull: false
  } });
    };

    return Funcao;
};
