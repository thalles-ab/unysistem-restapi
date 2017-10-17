module.exports = app => {
    const Servidores = app.db.models.Servidor;
    const fileUpload = require('express-fileupload');
    app.use(fileUpload());

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
                    }).then(result => res.status(200).json())
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
