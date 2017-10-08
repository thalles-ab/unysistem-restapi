module.exports	=	(sequelize,	DataType)	=>	{
    const	Docencia	=	sequelize.define("Docencia",	{
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

    Docencia.associate =	(models) => {
        Docencia.belongsTo(models.Servidor, { as : 'servidor' });
        Docencia.belongsTo(models.InstituicaoAcademica, { as : 'instituicaoAcademica' });
    };

    return	Docencia;
};
