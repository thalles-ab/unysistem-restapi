module.exports	=	(sequelize,	DataType)	=>	{
		const	Funcoes	=	sequelize.define("Funcoes",	{
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
				descricao:	{
						type:	DataType.STRING,
						allowNull:	false,
						validate:	{
								notEmpty:	true
						}
				}
		},	{
				classMethods:	{
						associate:	(models)	=>	{
								Funcoes.belongsTo(models.Servidores);
						}
				}
		});
		return	Funcoes;
};
