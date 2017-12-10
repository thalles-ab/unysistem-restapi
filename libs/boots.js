module.exports = app => {
    app.db.sequelize
        //.authenticate()
        .sync()
        .then(() => {
            console.log('conexão com banco efeutada');
        }).catch(error => {
            console.log('error db', error);
        }).done(() => {
            app.listen(app.get("port"), () => {
                console.log(`Talentos API - porta ${app.get("port")}`);
            });
        });
};
