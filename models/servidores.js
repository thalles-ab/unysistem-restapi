module.exports = (sequelize, DataType) => {
    const Servidor = sequelize.define("Servidor", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        foto: {
            type: DataType.BLOB('medium'),
            allowNull: true,
            get() {
                var aux = this.getDataValue('foto');
                if (aux == null) return;
                return aux.toString();
            }
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dataNascimento: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        sexo: {
            type: DataType.ENUM,
            allowNull: false,
            values: ['Masculino', 'Feminino', 'Outro']
        },
        estadoCivil: {
            type: DataType.ENUM,
            allowNull: false,
            values: ['Casado', 'Solteiro', 'Divorciado', 'Viuvo']
        },
        tipoSanguineo: {
            type: DataType.ENUM,
            allowNull: false,
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        },
        numeroFuncional: {
            type: DataType.INTEGER,
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
        cidade: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nacionalidade: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING
        },
    }, { freezeTableName: true });

    Servidor.associate = (models) => {
        Servidor.belongsTo(models.Setor, { as: 'setor' });
    };

    return Servidor;
};
