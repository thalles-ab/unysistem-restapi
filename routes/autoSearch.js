module.exports = app => (resourceDb, reqQuery) => {
    return new Promise((resolve, reject) => {
        var search = app.routes.searchModel(reqQuery);

        if(search.isEmpty()){
            resolve([]);
        }

        resourceDb
            .findAll({
                attributes: search.select_fields(),
                where: search.where_clause(),
                include: search.include_clause(),
                offset: search.offset ? parseInt(search.offset) : undefined,
                limit: search.limit ? parseInt(search.limit) : undefined,
                order: search.order_clause()
            })
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}
