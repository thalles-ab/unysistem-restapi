module.exports = (sequelize, DataType) => {
    const InstituicaoAcademica = sequelize.define("InstituicaoAcademica", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, { freezeTableName: true });

    return InstituicaoAcademica;
};
