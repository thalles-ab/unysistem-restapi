module.exports	=	(sequelize,	DataType)	=>	{
    const	AtividadesComplementares	=	sequelize.define("AtividadesComplementares",	{
        id:	{
            type:	DataType.INTEGER,
            primaryKey:	true,
            autoIncrement:	true
        },
        entidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        modalidade:	{
            type:	DataType.STRING,
            allowNull:	false,
            validate:	{
                notEmpty:	true
            }
        },
        cargaHoraria:	{
            type:	DataType.INTEGER,
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
    });

    AtividadesComplementares.associate = (models) => {
        AtividadesComplementares.belongsTo(models.Servidores);
    };
    return	AtividadesComplementares;
};
