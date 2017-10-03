module.exports	=	(sequelize,	DataType)	=>	{
    const	Nacionalidades	=	sequelize.define("Nacionalidades",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        paisNome:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        paisName:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        }
    });

    return	Nacionalidades;
};
