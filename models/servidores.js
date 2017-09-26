module.exports	=	(sequelize,	DataType)	=>	{
    const Servidores = sequelize.define("Servidores",	{
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
        dataNascimento:	{
            type:	DataType.DATE,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        sexo:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        estadoCivil:	{
            type:	DataType.STRING,
            allowNull:	false
        },
        numeroFuncional:	{
            type:	DataType.INTEGER,
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
        cidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        nacionalidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    });

    return	Servidores;
};
