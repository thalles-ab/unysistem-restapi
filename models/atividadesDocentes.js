module.exports	=	(sequelize,	DataType)	=>	{
    const	model	=	sequelize.define("AtividadeDocente",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        nome:	{
            type:	DataType.STRING,
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
        },
        local:	{
            type:	DataType.STRING
        }
    },{freezeTableName: true});

    model.associate =	(models) => {
        model.belongsTo(models.Servidor, { as : 'servidor' });
        model.belongsTo(models.InstituicaoAcademica, { as : 'instituicaoAcademica' });
    };

    return	model;
};
