module.exports	=	(sequelize,	DataType)	=>	{
    const	Contato	=	sequelize.define("Contato",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
		contato:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        tipo:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    },{freezeTableName: true});

    Contato.associate = (models)	=>	{
        Contato.belongsTo(models.Servidor, { as : 'servidor' });
    };

    return	Contato;
};
