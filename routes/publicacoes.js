module.exports = app => {
    const Publicacao = app.db.models.Publicacao;

    app.route("/publicacao")
        .get((req, res) => {
            Publicacao.findAll().then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Publicacao.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/publicacao/:id")
        .get((req, res) => {
            Publicacao.findOne({
                where: { id: req.params.id }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Publicacao.update(
                {
                    titulo: req.body.titulo,
                    local: req.body.local,
                    ano: req.body.ano,
                    tipo: req.body.tipo
                },
                { where: { id: req.params.id } }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Publicacao.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/servidores/:idServidor/publicacao")
        .get((req, res) => {
            Publicacao.findAll({
                where: {
                    servidor_id: req.params.idServidor
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/publicacao/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(Publicacao, req.query)
                .then(result => res.json(result));
        });
};
