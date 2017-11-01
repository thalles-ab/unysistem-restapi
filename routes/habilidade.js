module.exports = app => {
    const Habilidade = app.db.models.Habilidade;

    app.route("/servidores/:idServidor/habilidade")
        .get((req, res) => {
            Habilidade.findAll({
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

    app.route("/habilidade")
        .post((req, res) => {
            Habilidade.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/habilidade/:id")
        .get((req, res) => {
            Habilidade.findOne({
                where: { id: req.params.id }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Habilidade.update(
                {
                    nome: req.body.nome
                },
                { where: { id: req.params.id } }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Habilidade.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });
        
        app.route("/habilidade/nome/:nome")
        .get((req, res) => {
            Habilidade.findAll({
                attributes: ['id', 'nome'],
                where: {
                    nome: {
                        $like: "%" + req.params.nome + "%"
                    }
                },
                limit: 10,
                order: [
                    ['nome', 'ASC']
                ]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });
};
