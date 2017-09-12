module.exports	=	(sequelize,	DataType)	=>	{
    const	InstituicoesAcademicas	=	sequelize.define("InstituicoesAcademicas",	{
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

    InstituicoesAcademicas.associate = (models)	=>	{
        InstituicoesAcademicas.belongsTo(models.EnderecosInstituicoesAcademicas);
    };

    return	InstituicoesAcademicas;
};
