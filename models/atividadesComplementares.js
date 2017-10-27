module.exports = (sequelize, DataType) => {
    const AtividadeComplementar = sequelize.define("AtividadeComplementar", {
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
        modalidade: {
            type: DataType.ENUM,
            allowNull: false,
            values: ['Presencial', 'EAD', 'Semi-Presencial']
        },
        nomeCurso: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cargaHoraria: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        anoInicio: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: false
        },
        anoFim: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: false
        }
    }, { freezeTableName: true });

    AtividadeComplementar.associate = (models) => {
        AtividadeComplementar.belongsTo(models.Servidor, { as: 'servidor' });
    };
    return AtividadeComplementar;
};
