module.exports = app => {
    const model = app.db.models.Orgao;

    app.route("/orgaos")
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
