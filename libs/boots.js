module.exports	= app => {
    app.db.sequelize
        .authenticate()
        //.sync({force : true})
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
