module.exports	=	(sequelize,	DataType)	=>	{
		const	AtividadesComplementares	=	sequelize.define("AtividadesComplementares",	{
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
				}
		},	{
				classMethods:	{
						associate:	(models)	=>	{
								AtividadesComplementares.belongsTo(models.Servidores);
						}
				}
		});
		return	AtividadesComplementares;
};
