module.exports = app => {
    const model = app.db.models.InstituicoesAcademicas;

    app.route("/instituicoes-academicas/nome/:nome")
        .get((req, res) => {
            model.findAll({
                attributes: ['id', 'nome'],
                where: {
                    nome: {
                        $like : "%"+req.params.nome+"%"
                    }
                },
                limit: 10,
                order: [
                    ['nome', 'ASC']
                ]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
};
