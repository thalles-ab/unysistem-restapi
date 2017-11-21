module.exports = app => {
    const Servidores = app.db.models.Servidor;

    app.route("/servidores")
        .get((req, res) => {
            app.routes.autoSearch(Servidores, req.query)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })
        .post((req, res) => {
            Servidores.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/servidores/:id(\\d+)/")
        .get((req, res) => {
            Servidores.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: app.db.models.Cargo, attributes: ['nome', 'dataInicio', 'dataFim'], as: 'cargo', include: [
                            { model: app.db.models.Orgao, attributes: ['nome', 'sigla'], as: 'orgao' },
                        ]
                    },
                    {
                        model: app.db.models.Funcao, attributes: ['nome', 'descricao', 'dataInicio', 'dataFim'], as: 'funcao', include: [
                            { model: app.db.models.Orgao, attributes: ['nome', 'sigla'], as: 'orgao' },
                            { model: app.db.models.Setor, attributes: ['nome'], as: 'setor' },
                        ]
                    },
                    {
                        model: app.db.models.FormacaoAcademica, attributes: ['curso', 'nivel', 'dataInicio', 'dataFim'], as: 'formacaoAcademica', include: [
                            { model: app.db.models.InstituicaoAcademica, attributes: ['nome'], as: 'instituicaoAcademica' }
                        ]
                    },
                    { model: app.db.models.AtividadeComplementar, attributes: ['entidade', 'modalidade', 'anoFim', 'nomeCurso', 'cargaHoraria'], as: 'atividadeComplementar' },
                    { model: app.db.models.Habilidade, attributes: ['nome', 'numRecomendacoes'], as: 'habilidade' },
                    { model: app.db.models.Publicacao, attributes: ['titulo', 'local', 'ano', 'tipo'], as: 'publicacao' },
                ]
            }).then(result => res.json(result)).catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        })
        .put((req, res) => {
            Servidores.update({
                nome: req.body.nome,
                dataNascimento: req.body.dataNascimento,
                sexo: req.body.sexo,
                estadoCivil: req.body.estadoCivil,
                numeroFuncional: req.body.numeroFuncional,
                estado: req.body.estado,
                cidade: req.body.cidade,
                nacionalidade: req.body.nacionalidade
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
            Servidores.destroy({
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

    app.route("/servidores/:id/foto")
        .post((req, res) => {
            if (!req.files) {
                return res.status(412).json({
                    msg: "Nenhuma imagem selecionada"
                });
            }
            Servidores.findOne({
                where: {
                    id: req.params.id
                }
            }).then(result => {
                var data = 'data:' + req.files.foto.mimetype + ';base64,' + req.files.foto.data.toString("base64");
                Servidores.update({
                    foto: data
                }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(result => res.status(200).json({ foto: data }))
                    .catch(error => {
                        res.status(412).json({
                            msg: error.message
                        });
                    });
            })
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });

        });

    app.route("/servidores/nome/:nome")
        .get((req, res) => {
            Servidores.findOne({
                where: {
                    nome: req.params.nome
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

};
