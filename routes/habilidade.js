module.exports = app => {
    const Habilidade = app.db.models.Habilidade;
    const Recomendacao = app.db.models.Recomendacao;
    const Servidor = app.db.models.Servidores;

    app.route("/servidores/:idServidor/habilidade")
        .get((req, res) => {
            Habilidade.findAll({
                    attributes: {
                        include: [
                             [
                                app.db.sequelize.literal('(SELECT COUNT(recomendacao.id) FROM Recomendacao as recomendacao WHERE recomendacao.habilidade_id = Habilidade.id)'),
                                'numRecomendacoes'
                             ],
                        ]
                    },
                    order: app.db.sequelize.literal('(SELECT COUNT(recomendacao.id) FROM Recomendacao as recomendacao WHERE recomendacao.habilidade_id = Habilidade.id) DESC'),
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

    app.route("/habilidade/:idHabilidade/recomendacao/")
        .get((req, res) => {
            Recomendacao.findAll({
                    attributes: [],
                    include: [{
                        model: app.db.models.Servidor,
                        attributes: ['id', 'foto', 'nome'],
                        as: 'servidor'
                    }],
                    where: {
                        habilidade_id: req.params.idHabilidade
                    }
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/habilidade/:idHabilidade/recomendacao/:idServidor")
        .delete((req, res) => {
            Recomendacao.destroy({
                    where: {
                        servidor_id: req.params.idServidor,
                        habilidade_id: req.params.idHabilidade
                    }
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })
        .post((req, res) => {
            Recomendacao.findOne({
                    where: {
                        servidor_id: req.params.idServidor,
                        habilidade_id: req.params.idHabilidade
                    }
                }).then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        Recomendacao.create({
                                servidor_id: req.params.idServidor,
                                habilidade_id: req.params.idHabilidade
                            }).then(recomendacao => res.json(result))
                            .catch(error => {
                                res.status(412).json({
                                    msg: error.message
                                });
                            });
                    }
                })
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/habilidade")
        .post((req, res) => {
            Habilidade.findOne({
                where: {
                    servidor_id: req.body.servidor_id,
                    nome: {
                        $like: req.body.nome
                    }
                }
            }).then(result => {
                if (result) {
                    res.status(412).json({
                        msg: "Habilidade já cadastrada."
                    });
                } else {
                    Habilidade.create(req.body)
                        .then(result => res.json(result))
                        .catch(error => {
                            res.status(412).json({
                                msg: error.message
                            });
                        });
                }
            }).catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });

        });

    app.route("/habilidade/:id")
        .get((req, res) => {
            Habilidade.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })
        .put((req, res) => {
            Habilidade.update({
                    nome: req.body.nome
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })
        .delete((req, res) => {
            Habilidade.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
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
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });


    app.route("/habilidade")
        .get((req, res) => {
            app.routes.autoSearch(Habilidade, req.query)
                .then(result => res.json(result));
        });
};