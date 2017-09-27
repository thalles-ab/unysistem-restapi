module.exports = app => {
    const FormacaoAcademica = app.db.models.FormacoesAcademicas;

    app.route("/formacaoacademica")
    .get((req, res) => {
             FormacaoAcademica.findAll().then(result => res.json(result))
            .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         })
         .post((req, res) => {
             FormacaoAcademica.create(req.body)
             .then(result => res.json(result))
             .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         });
         
     app.route("/formacaoacademica/:id")
         .get((req, res) => {
             FormacaoAcademica.findOne({
                 where: {id: req.params.id}
             }).then(result => res.json(result))
             .catch(error => {
                 res.status(412).json({msg: error.message});
             });
         })
         .put((req, res) => {
             FormacaoAcademica.update(
                  {
                     curso: req.body.curso,
                     dataInicio: req.body.dataInicio,
                     sexo: req.body.sexo,
                     dataFim: req.body.dataFim,
                     nivel: req.body.nivel
                  },
                  {where: { id: req.params.id }}
             ).then(result => res.json(result))
                 .catch(error => {
                     res.status(412).json({msg: error.message});
             });
         })
         .delete((req, res) => {
             FormacaoAcademica.destroy({
                 where: {
                     id: req.params.id
                 }
             }).then(result => res.json(result))
                 .catch(error => {
                     res.status(412).json({msg: error.message});
             });
         });
};