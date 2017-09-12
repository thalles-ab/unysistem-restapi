module.exports	=	(sequelize,	DataType)	=>	{
    const	Instituicoes	=	sequelize.define("Instituicoes",	{
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

    Instituicoes.associate = (models)	=>	{
        Instituicoes.belongsTo(models.EnderecosInstituicoes);
    };

    return	Instituicoes;
};
