module.exports = app => {
    const model = app.db.models.Nacionalidades;

    app.route("/nacionalidades/nome/:nome")
        .get((req, res) => {
            model.findAll({
                attributes: ['id', 'paisNome'],
                where: {
                    paisNome: {
                        $like : "%"+req.params.nome+"%"
                    }
                }
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
};
