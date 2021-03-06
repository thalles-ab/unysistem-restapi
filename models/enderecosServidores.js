module.exports = (sequelize, DataType) => {
    const EnderecoServidor = sequelize.define("EnderecoServidor", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rua: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        estado: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cep: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        numero: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: false
        },
        telefone: {
            type: DataType.STRING
        },
        cidade: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, { freezeTableName: true });

    EnderecoServidor.associate = (models) => {
        EnderecoServidor.belongsTo(models.Servidor, { as: 'servidor' });
    };

    return EnderecoServidor;
};
