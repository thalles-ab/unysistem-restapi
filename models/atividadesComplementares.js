module.exports	=	(sequelize,	DataType)	=>	{
    const	AtividadeComplementar	=	sequelize.define("AtividadeComplementar",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        entidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        modalidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        cargaHoraria:	{
            type:	DataType.INTEGER,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        dataInicio:	{
            type:	DataType.DATE,
            allowNull:	false,
            defaultValue:	false
        },
        dataFim:	{
            type:	DataType.DATE,
            allowNull:	false,
            defaultValue:	false
        }
    },{freezeTableName: true});

    AtividadeComplementar.associate = (models) => {
        AtividadeComplementar.belongsTo(models.Servidor, { as : 'servidor' });
    };
    return	AtividadeComplementar;
};
