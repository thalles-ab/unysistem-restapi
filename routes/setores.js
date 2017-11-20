module.exports = app => {
    const model = app.db.models.Setor;

    app.route("/setores")
        .get((req, res) => {
            app.routes.autoSearch(model, req.query)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });
};
