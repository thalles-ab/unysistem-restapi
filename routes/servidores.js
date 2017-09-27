module.exports = app => {
    const Servidores = app.db.models.Servidores;

    app.route("/servidores")
        .get((req, res) => {
            Servidores.findAll().then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            Servidores.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
        
    app.route("/servidores/:id")
        .get((req, res) => {
            Servidores.findOne({
                where: {id: req.params.id}
            }).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .put((req, res) => {
            Servidores.update(
                 {
                    nome: req.body.nome,
                    dataNascimento: req.body.dataNascimento,
                    sexo: req.body.sexo,
                    estadoCivil: req.body.estadoCivil,
                    numeroFuncional: req.body.numeroFuncional,
                    estado: req.body.estado,
                    cidade: req.body.cidade,
                    nacionalidade: req.body.nacionalidade
                 },
                 {where: { id: req.params.id }}
            ).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Servidores.destroy({
                where: {
                    id: req.params.id
                }
            }).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
            });
        });
};