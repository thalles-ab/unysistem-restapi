module.exports = (sequelize, DataType) => {
    const Noticia = sequelize.define("Noticia", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        imgDestaque: {
            type: DataType.BLOB('medium'),
            get() {
                var aux = this.getDataValue('imgDestaque');
                if (aux == null) return;
                return aux.toString();
            }
        },
        conteudo: {
            type: DataType.BLOB('long'),
            allowNull: true,
            get() {
                var aux = this.getDataValue('conteudo');
                if (aux == null) return;
                return aux.toString();
            }
        },
    }, { freezeTableName: true });


    return Noticia;
};
