module.exports = (app) => {
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
            console.log(req.query.teste);
            
            let queryInstituicao = { nome: {like: '%'+req.query.instituicao+'%'} };
            if(req.query.instituicao.length <= 0)
                queryInstituicao = {};
                
            let queryNome = {nome: {like: '%'+req.query.nome+'%'}};
            if(req.query.nome.length <= 0)
                queryNome = {};
                
            let queryCargo = { nome: {like: '%'+req.query.cargo+'%'} };
            if(req.query.cargo.length <= 0)
                queryCargo = {};
                
            let queryOrgao = { nome: {like: '%'+req.query.orgao+'%'} };
            if(req.query.orgao.length <= 0)
                queryOrgao = {};
                
            let querySetor = { nome: {like: '%'+req.query.setor+'%'} };
            if(req.query.setor.length <= 0)
                querySetor = {};
            
            Servidores.findAll({
                include : [
                    { model : app.db.models.Cargo, where: queryCargo, required:false, attributes: ['id', 'nome', 'dataInicio'], as : 'cargo', 
                    include : [{ model : app.db.models.Orgao, where: queryOrgao, required:false, attributes: ['id', 'nome'], as : 'orgao' },
                               { model : app.db.models.Setor, where: querySetor, required:false, attributes: ['id', 'nome'], as : 'setor' },
                              ],
                    order:[['$cargo.dataInicio$', 'DESC']]
                    },
                    { model : app.db.models.FormacaoAcademica, required:false, attributes: ['id', 'curso'], as : 'formacaoAcademica', 
                    include : { model : app.db.models.InstituicaoAcademica, where: queryInstituicao, required:false, attributes: ['id', 'nome'], as : 'instituicaoAcademica' } },
                    // { model : app.db.models.FormacaoAcademica, where: { nome: {like: '%'+req.query.instituicao+'%'} }, attributes: ['id', 'nome'], as : 'instituicao' },
                    //{ model : app.db.models.Cargo.Orgao, attributes: ['id', 'nome', 'sigla'], as : 'orgao' }
                ],
                where: queryNome
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
                }
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
