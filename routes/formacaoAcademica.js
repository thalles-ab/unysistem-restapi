module.exports = app => {
    const FormacaoAcademica = app.db.models.FormacaoAcademica;

    app.route("/formacaoacademica")
        .post((req, res) => {
            console.log(req.body);
            FormacaoAcademica.create(req.body)
                .then(result => res.json(result))
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
                    include : [{ model : app.db.models.InstituicoesAcademicas, attributes: ['id', 'nome'] }]
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

};