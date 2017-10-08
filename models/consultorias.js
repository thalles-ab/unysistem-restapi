module.exports	=	(sequelize,	DataType)	=>	{
    const	Consultoria	=	sequelize.define("Consultoria",	{
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

    Consultoria.associate =	(models) => {
        Consultoria.belongsTo(models.Servidor, { as : 'servidor' });
        Consultoria.belongsTo(models.Instituicao, { as : 'instituicao' });
    };

    return	Consultoria;
};
