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

    //TODO: arruamar essa gambiarra!!!!
    app.route("/servidores2")
        .get((req, res) => {
            console.log(req.query.nome);
            console.log(req.query.instituicao);
            console.log(req.query.cargo);
            console.log(req.query.orgao);
            console.log(req.query.setor);
            console.log(req.query.habilidade);
            console.log(req.query.funcao);
            console.log('');

            let queryNome = { nome: { like: '%' + req.query.nome + '%' } };
            if (req.query.nome.length <= 0)
                queryNome = {};

            /*Cargo*/
            let queryOrgao = { model: app.db.models.Orgao, where: { nome: { like: '%' + req.query.orgao + '%' } }, attributes: ['id', 'nome'], as: 'orgao' };
            if (req.query.orgao.length <= 0)
                queryOrgao = { model: app.db.models.Orgao, required: false, attributes: ['id', 'nome'], as: 'orgao' };

            let querySetor = { model: app.db.models.Setor, where: { nome: { like: '%' + req.query.setor + '%' } }, attributes: ['id', 'nome'], as: 'setor' };
            if (req.query.setor.length <= 0)
                querySetor = { model: app.db.models.Setor, required: false, attributes: ['id', 'nome'], as: 'setor' };

            /*Funcao*/
            let queryOrgao2 = { model: app.db.models.Orgao, where: { nome: { like: '%' + req.query.orgao + '%' } }, attributes: ['id', 'nome'], as: 'orgaoFuncao' };
            if (req.query.orgao.length <= 0)
                queryOrgao2 = { model: app.db.models.Orgao, required: false, attributes: ['id', 'nome'], as: 'orgaoFuncao' };

            let querySetor2 = { model: app.db.models.Setor, where: { nome: { like: '%' + req.query.setor + '%' } }, attributes: ['id', 'nome'], as: 'setorFuncao' };
            if (req.query.setor.length <= 0)
                querySetor2 = { model: app.db.models.Setor, required: false, attributes: ['id', 'nome'], as: 'setorFuncao' };



            let queryCargo = {
                model: app.db.models.Cargo, where: { nome: { like: '%' + req.query.cargo + '%' } }, attributes: ['id', 'nome', 'dataInicio'], as: 'cargo',
                include: [queryOrgao,
                    querySetor,
                ],
                order: [['$cargo.dataInicio$', 'DESC']]
            };

            if (req.query.cargo.length <= 0)
                queryCargo = queryCargo = {
                    model: app.db.models.Cargo, required: false, attributes: ['id', 'nome', 'dataInicio'], as: 'cargo',
                    include: [queryOrgao,
                        querySetor,
                    ],
                    order: [['$cargo.dataInicio$', 'DESC']]
                };

            let queryFuncao = {
                model: app.db.models.Funcao, where: { nome: { like: '%' + req.query.funcao + '%' } }, attributes: ['id', 'nome', 'dataInicio'], as: 'funcao',
                include: [queryOrgao2,
                    querySetor2,
                ],
                order: [['funcao.dataInicio$', 'DESC']]
            };

            if (req.query.funcao.length <= 0)
                queryFuncao = queryFuncao = {
                    model: app.db.models.Funcao, required: false, attributes: ['id', 'nome', 'dataInicio'], as: 'funcao',
                    include: [queryOrgao2,
                        querySetor2,
                    ],
                    order: [['funcao.dataInicio$', 'DESC']]
                };

            let queryInstituicao = {
                model: app.db.models.FormacaoAcademica, attributes: ['id', 'curso'], as: 'formacaoAcademica',
                include: { model: app.db.models.InstituicaoAcademica, where: { nome: { like: '%' + req.query.instituicao + '%' } }, attributes: ['id', 'nome'], as: 'instituicaoAcademica' }
            };
            if (req.query.instituicao.length <= 0)
                queryInstituicao = {
                    model: app.db.models.FormacaoAcademica, attributes: ['id', 'curso'], as: 'formacaoAcademica',
                    include: { model: app.db.models.InstituicaoAcademica, required: false, attributes: ['id', 'nome'], as: 'instituicaoAcademica' }
                };

            let queryHabilidade = {
                model: app.db.models.Habilidade, attributes: ['id', 'nome', 'numRecomendacoes'], where: { nome: { like: '%' + req.query.habilidade + '%' } }, as: 'habilidade'
            };
            if (req.query.habilidade.length <= 0)
                queryHabilidade = {
                    model: app.db.models.Habilidade, required: false, attributes: ['id', 'nome', 'numRecomendacoes'], as: 'habilidade'
                };

            Servidores.findAll({
                attributes: ['id', 'nome', 'dataNascimento', 'sexo', 'estadoCivil', 'tipoSanguineo', 'numeroFuncional', 'estado', 'cidade', 'nacionalidade',
                    'email', 'telefone', 'admin', 'created_at', 'updated_at'],
                include: [queryCargo,
                    queryFuncao,
                    queryInstituicao,
                    queryHabilidade
                ],
                where: queryNome
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/servidores3/:id(\\d+)/:idLogado(\\d+)/")
        .get((req, res) => {

            Servidores.findOne({
                attributes: ['id', 'nome', 'dataNascimento', 'sexo', 'estadoCivil', 'tipoSanguineo', 'numeroFuncional', 'estado', 'cidade', 'nacionalidade',
                    'email', 'telefone', 'admin', 'created_at', 'updated_at'],
                include: [{
                    model: app.db.models.Cargo, attributes: ['id', 'nome', 'dataInicio'], as: 'cargo',
                    include: [{ model: app.db.models.Orgao, attributes: ['id', 'nome', 'sigla'], as: 'orgao' },
                    { model: app.db.models.Setor, attributes: ['id', 'nome'], as: 'setor' },
                    ],
                    order: [['$cargo.dataInicio$', 'DESC']]
                },
                {
                    model: app.db.models.Funcao, attributes: ['id', 'nome', 'dataInicio'], as: 'funcao',
                    include: [{ model: app.db.models.Orgao, attributes: ['id', 'nome', 'sigla'], as: 'orgaoFuncao' },
                    { model: app.db.models.Setor, attributes: ['id', 'nome'], as: 'setorFuncao' },
                    ],
                    order: [['funcao.dataInicio$', 'DESC']]
                },
                {
                    model: app.db.models.FormacaoAcademica, attributes: ['id', 'curso'], as: 'formacaoAcademica',
                    include: { model: app.db.models.InstituicaoAcademica, attributes: ['id', 'nome'], as: 'instituicaoAcademica' }
                },
                {
                    model: app.db.models.Habilidade,
                    attributes: {
                        include: [
                            'id',
                            'nome',
                            [
                                app.db.sequelize.literal('(SELECT COUNT(recomendacao.id) FROM Recomendacao as recomendacao WHERE recomendacao.habilidade_id = habilidade.id)'),
                                'numRecomendacoes'
                            ],
                            [
                                app.db.sequelize.literal('CASE WHEN (SELECT 1 FROM Recomendacao as recomendacao WHERE recomendacao.habilidade_id = habilidade.id and recomendacao.servidor_id = ' + req.params.idLogado + ') THEN 1 ELSE 0 END'),
                                'recomendado'
                            ]
                        ]
                    }, as: 'habilidade'
                },
                { model: app.db.models.AtividadeComplementar, attributes: ['entidade', 'modalidade', 'anoFim', 'nomeCurso', 'cargaHoraria'], as: 'atividadeComplementar' },
                { model: app.db.models.Publicacao, attributes: ['titulo', 'local', 'ano', 'tipo'], as: 'publicacao' }],
                where: { id: req.params.id }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
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
                            { model: app.db.models.Orgao, attributes: ['nome', 'sigla'], as: 'orgaoFuncao' },
                            { model: app.db.models.Setor, attributes: ['nome'], as: 'setorFuncao' },
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
                nacionalidade: req.body.nacionalidade,
                email: req.body.email,
                telefone: req.body.telefone
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
            var data = req.body.foto;
            Servidores.findOne({ where: { id: req.params.id } })
                .then(result => {
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

        }).get((req, res) => {
            Servidores.findOne({
                attributes: ['foto', 'id'],
                where: { id: req.params.id }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
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
