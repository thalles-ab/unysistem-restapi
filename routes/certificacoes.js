module.exports = app => {
    const Certificacoes = app.db.models.Certificacao;

    app.route("/certificacoes")
       .post((req, res) => {
            Certificacoes.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/certificacoes/:id")
        .get((req, res) => {
            Certificacoes.findOne(
                {
                    where: { id: req.params.id }
                }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Certificacoes.update(
                {
                    entidade: req.body.entidade,
                    nomeCurso: req.body.nomeCurso,
                    anoFim: req.body.anoFim,
                },
                { where: { id: req.params.id } }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Certificacoes.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/servidores/:idServidor/certificacoes")
        .get((req, res) => {
            Certificacoes.findAll({
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

    app.route("/certificacoes/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(Certificacoes, req.query)
                .then(result => res.json(result));
        });
};
