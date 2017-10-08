module.exports	=	(sequelize,	DataType)	=>	{
    const Interesse	=	sequelize.define("Interesse",	{
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
    },{freezeTableName: true});

    Interesse.associate = (models) => {
        Interesse.belongsTo(models.Servidor, { as : 'servidor' });
    };

    return	Interesse;
};
