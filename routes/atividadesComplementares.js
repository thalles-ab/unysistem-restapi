module.exports = app => {
    const AtividadesComplementares = app.db.models.AtividadesComplementares;

    app.route("/atividades-complementares")
        .get((req, res) => {
            AtividadesComplementares.findAll().then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            AtividadesComplementares.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
        app.route("/atividades-complementares/:id")
        .put((req, res) => {
            AtividadesComplementares.update(
                 {
                    entidade: req.body.entidade,
                    modalidade: req.body.modalidade,
                    cargaHoraria: req.body.cargaHoraria,
                    dataInicio: req.body.dataInicio,
                    dataFim: req.body.dataFim,
                 },
                 {where: { id: req.params.id }}
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            AtividadesComplementares.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
            });
        });
};