module.exports	=	(sequelize,	DataType)	=>	{
    const	FormacaoAcademica	=	sequelize.define("FormacaoAcademica",	{
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
    },{freezeTableName: true});

    FormacaoAcademica.associate =	(models) => {
        FormacaoAcademica.belongsTo(models.Servidor, { as : 'servidor' });
        FormacaoAcademica.belongsTo(models.InstituicaoAcademica, { as : 'instituicaoAcademica' });
    };

    return	FormacaoAcademica;
};
