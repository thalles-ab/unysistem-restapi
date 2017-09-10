module.exports	=	(sequelize,	DataType)	=>	{
		const	Servidores	=	sequelize.define("Servidores",	{
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
				dataNascimento:	{
						type:	DataType.DATE,
						allowNull:	false,
						defaultValue:	false
				},
				nacionalidade:	{
						type:	DataType.STRING,
						allowNull:	false,
						validate:	{
								notEmpty:	true
						}
				}
		},	{
				classMethods:	{
						associate:	(models)	=>	{
								Servidores.belongsTo(models.Users);
						}
				}
		});
		return	Servidores;
};
