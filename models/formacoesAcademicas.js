module.exports	=	(sequelize,	DataType)	=>	{
    const	FormacoesAcademicas	=	sequelize.define("FormacoesAcademicas",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        curso:	{
            type:	DataType.INTEGER,
            allowNull:	false
        },
        dataInicio:	{
            type:	DataType.DATE,
            allowNull:	false,
            defaultValue:	false
        },
        dataFim:	{
            type:	DataType.DATE,
            allowNull:	false,
            defaultValue:	false
        },
        nivel:	{
            type:	DataType.INTEGER,
            allowNull:	false
        }
    });

    FormacoesAcademicas.associate =	(models) => {
        FormacoesAcademicas.belongsTo(models.Servidores);
        FormacoesAcademicas.belongsTo(models.InstituicoesAcademicas);
    };

    return	FormacoesAcademicas;
};
