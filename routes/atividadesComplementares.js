module.exports = app => {
    const AtividadesComplementares = app.db.models.AtividadeComplementar;

    app.route("/atividades-complementares")
        /*.get((req, res) => {
            AtividadesComplementares.findAll().then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })*/
        .post((req, res) => {
            AtividadesComplementares.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/atividades-complementares/:id")
        .get((req, res) => {
            AtividadesComplementares.findOne(
                {
                    where: { id: req.params.id }
                }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            AtividadesComplementares.update(
                {
                    entidade: req.body.entidade,
                    modalidade: req.body.modalidade,
                    cargaHoraria: req.body.cargaHoraria,
                    dataInicio: req.body.dataInicio,
                    dataFim: req.body.dataFim,
                },
                { where: { id: req.params.id } }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            AtividadesComplementares.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/servidores/:idServidor/atividades-complementares")
        .get((req, res) => {
            AtividadesComplementares.findAll({
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

    app.route("/atividades-complementares/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(AtividadesComplementares, req.query)
                .then(result => res.json(result));
        });
};
