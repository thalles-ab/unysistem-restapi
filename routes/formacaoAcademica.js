module.exports = app => {
    const FormacaoAcademica = app.db.models.FormacaoAcademica;
    const modelCursos = app.db.models.CursoCadastrado;

    app.route("/formacaoacademica")
        .post((req, res) => {
            var model = req.body;
            
            var curso = req.body.curso;
            model.curso = curso.charAt(0).toUpperCase() + curso.slice(1).toLowerCase();
            
            FormacaoAcademica.create(model)
                .then(result => {
                    
                    modelCursos.findOrCreate({
                        where : { nome : model.curso }
                    });

                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/formacaoacademica/:id")
        .get((req, res) => {
            FormacaoAcademica.findOne({
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
            FormacaoAcademica.destroy({
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
            FormacaoAcademica.update({
                curso: req.body.curso,
                dataInicio: req.body.dataInicio,
                dataFim: req.body.dataFim,
                nivel: req.body.nivel,
                instituicoes_academica_id: req.body.instituicoes_academica_id
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
        });

    app.route("/servidores/:idServidor/formacaoacademica")
        .get((req, res) => {
            FormacaoAcademica.findAll({
                where: {
                    servidor_id: req.params.idServidor
                },
                include: [
                    {
                        model: app.db.models.InstituicaoAcademica,
                        as: 'instituicaoAcademica',
                        attributes: ['id', 'nome']
                    }
                ]
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

};
