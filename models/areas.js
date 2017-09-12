module.exports	=	(sequelize,	DataType)	=>	{
    const	Areas	=	sequelize.define("Areas",	{
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
        }
    });

    Areas.associate = (models)	=>	{
        Areas.belongsTo(models.Cargos);
    };

    return	Areas;
};
