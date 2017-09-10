module.exports	=	(sequelize,	DataType)	=>	{
    const	Interesses	=	sequelize.define("Interesses",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        descricao:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    });

    Interesses.associate = (models) => {
        Interesses.belongsTo(models.Servidores);
    };

    return	Interesses;
};
