module.exports = app => {
    const model = app.db.models.CursoCadastrado;

    app.route("/cursos/")
        .get((req, res) => {
            app.routes.autoSearch(model, req.query)
                .then(result => res.json(result));
        });
};
