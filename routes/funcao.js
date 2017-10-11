module.exports = app => {
    const Funcao = app.db.models.Funcao;

    app.route("/funcao")
        .get((req, res) => {
            Funcao.findAll().then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Funcao.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/funcao/:id")
        .get((req, res) => {
            Funcao.findOne({
                where: { id: req.params.id }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Funcao.update(
                {
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    dataInicio: req.body.dataInicio,
                    dataFim: req.body.dataFim
                },
                { where: { id: req.params.id } }
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Funcao.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/servidores/:idServidor/funcao")
        .get((req, res) => {
            Funcao.findAll({
                where: {
                    servidor_id: req.params.idServidor
                }//,
                //include : [{ model : app.db.models.Cargos, attributes: ['id', 'nome'] }]
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

    app.route("/funcoes/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(Funcao, req.query)
                .then(result => res.json(result));
        });
};
