module.exports	=	(sequelize,	DataType)	=>	{
    const Instituicao = sequelize.define("Instituicao",	{
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

    Instituicao.associate = (models)	=>	{
        Instituicao.belongsTo(models.EnderecoInstituicao, { as : 'servidor' });
    };

    return	Instituicao;
};
