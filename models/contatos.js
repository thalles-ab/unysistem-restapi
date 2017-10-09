module.exports = (sequelize, DataType) => {
    const Contato = sequelize.define("Contato", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contato: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tipo: {
            type     : DataType.ENUM,
            allowNull: false,
            values   : ['E-mail', 'Telefone']
        }
    },{freezeTableName: true});

    Contato.associate = (models) => {
        Contato.belongsTo(models.Servidor, { as : 'servidor' });
    };

    return Contato;
};
