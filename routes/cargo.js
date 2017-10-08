module.exports = app => {
    const Cargo = app.db.models.Cargo;

    app.route("/Cargo")
    .get((req, res) => {
             Cargo.findAll().then(result => res.json(result))
            .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         })
         .post((req, res) => {
             Cargo.create(req.body)
             .then(result => res.json(result))
             .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         });
         
     app.route("/Cargo/:id")
         .get((req, res) => {
             Cargo.findOne({
                 where: {id: req.params.id}
             }).then(result => res.json(result))
             .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         })
         .put((req, res) => {
             Cargo.update(
                  {
                      nome: req.body.nome,
                     funcao: req.body.funcao,
                     setor: req.body.setor,
                     dataInicio: req.body.dataInicio,
                     dataFim: req.body.dataFim
                  },
                  {where: { id: req.params.id }}
             ).then(result => res.json(result))
                 .catch(error => {
                     res.status(412).json({msg: error.message});
             });
         })
         .delete((req, res) => {
             Cargo.destroy({
                 where: {
                     id: req.params.id
                 }
             }).then(result => res.json(result))
                 .catch(error => {
                     res.status(412).json({msg: error.message});
             });
         });
         
             app.route("/servidores/:idServidor/cargo")
        .get((req, res) => {
            Cargo.findAll({
                    where: {
                        servidore_id: req.params.idServidor
                    }//,
                    //include : [{ model : app.db.models.Cargos, attributes: ['id', 'nome'] }]
                }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        });

        app.route("/cargos/pesquisa")
        .get((req, res) => {
            app.routes.autoSearch(Cargo, req.query)
            .then(result => res.json(result));
        });
};
