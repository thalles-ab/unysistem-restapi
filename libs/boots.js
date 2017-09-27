module.exports	= app => {
    app.db.sequelize.sync()
        .then(() => {
            console.log('banco atualizado');
        }).catch(error => {
            console.log('error db', error);
        }).done(() => {
            app.listen(app.get("port"), () => {
            console.log(`Talentos API - porta ${app.get("port")}`);
        });
    });
};
