module.exports	=	(sequelize,	DataType)	=>	{
    const	Recomendacoes	=	sequelize.define("Recomendacoes",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
		nota:	{
            type:	DataType.INTEGER
        },
        descricao:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    });

    Recomendacoes.associate = (models)	=>	{
        Recomendacoes.belongsTo(models.Servidores);
    };

    return	Recomendacoes;
};
