module.exports	=	(sequelize,	DataType)	=>	{
    const Recomendacao	=	sequelize.define("Recomendacao",	{
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
    },{freezeTableName: true});

    Recomendacao.associate = (models)	=>	{
        Recomendacao.belongsTo(models.Servidor, { as : 'servidor' });
    };

    return	Recomendacao;
};
