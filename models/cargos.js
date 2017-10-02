module.exports	=	(sequelize,	DataType)	=>	{
    const	Cargos	=	sequelize.define("Cargos",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
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
    });

    Cargos.associate = (models)	=>	{
        Cargos.belongsTo(models.Funcoes);
        Cargos.belongsTo(models.Setor);
    };
        

    return	Cargos;
};
