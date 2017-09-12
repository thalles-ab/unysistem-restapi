module.exports	=	(sequelize,	DataType)	=>	{
    const	Contatos	=	sequelize.define("Contatos",	{
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
    });

    Contatos.associate = (models)	=>	{
        Contatos.belongsTo(models.Servidores);
    };

    return	Contatos;
};
