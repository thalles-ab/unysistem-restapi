module.exports = app => {
    const model = app.db.models.CargoCadastrado;

    app.route("/cargosCadastrados/")
        .get((req, res) => {
            model.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });
        
    app.route("/cargosCadastrados/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(model, req.query)
                .then(result => res.json(result));
        });
};
