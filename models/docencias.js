module.exports	=	(sequelize,	DataType)	=>	{
    const	Docencias	=	sequelize.define("Docencias",	{
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

    Docencias.associate =	(models) => {
        Docencias.belongsTo(models.Servidores);
        Docencias.belongsTo(models.InstituicoesAcademicas);
    };

    return	Docencias;
};
