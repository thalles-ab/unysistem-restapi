module.exports	=	(sequelize,	DataType)	=>	{
    const Area	=	sequelize.define("Area",	{
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
    },{freezeTableName: true});

    Area.associate = (models)	=>	{
        Area.belongsTo(models.Cargo, { as : 'cargo'});
    };

    return	Area;
};
