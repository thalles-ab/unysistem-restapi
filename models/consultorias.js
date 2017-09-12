module.exports	=	(sequelize,	DataType)	=>	{
    const	Consultorias	=	sequelize.define("Consultorias",	{
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
    });

    Consultorias.associate =	(models) => {
        Consultorias.belongsTo(models.Servidores);
        Consultorias.belongsTo(models.Instituicoes);
    };

    return	Consultorias;
};
