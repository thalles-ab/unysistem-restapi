module.exports	=	(sequelize,	DataType)	=>	{
    const	EnderecosServidores	=	sequelize.define("EnderecosServidores",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        rua:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        estado:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        cep:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        numero:	{
            type:	DataType.INTEGER,
            allowNull:	false,
            defaultValue:	false
        },
        telefone:	{
            type:	DataType.STRING
        },
        cidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    });

    EnderecosServidores.associate =	(models) =>	{
        EnderecosServidores.belongsTo(models.Servidores);
    };

    return	EnderecosServidores;
};
