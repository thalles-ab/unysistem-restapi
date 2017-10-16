module.exports = app => (reqQuery) => {

    var SearchModel = {
        filterJoin: [],
        fieldsJoin: [],

        select_fields() {

            if (!this.fields) {
                return [];
            }

            var selectedFields = [];

            this.fields.split(',').forEach((element) => {
                element = this.normalize_query(element).trim();

                if (element.indexOf('\.') > -1) {
                    this.fieldsJoin.push(element);
                } else {
                    selectedFields.push(element);
                }
            });

            return selectedFields;
        },

        where_clause() {

            if (!this.filter) {
                return {};
            }

            var where = [];

            this.filter.split(',').forEach((element) => {
                element = this.normalize_query(element).trim();

                if (element.indexOf('\.') > -1) {
                    this.filterJoin.push(element);
                } else {
                    where.push(this.parse_where_expression(element));
                }
            });

            return where;
        },

        parse_where_expression(exp) {
            var str = this.normalize_query(exp).split(' ');

            var property = str[0];
            var operator = str[1];
            var value = str[2];

            return JSON.parse('{ "' + property + '" : { "$' + operator + '" : "' + value + '" } }');
        },

        include_clause() {
            if (!this.filterJoin && !this.fieldsJoin) {
                return [];
            }

            var includes = [];
            var models = [];
            var where = [];

            if (this.fieldsJoin) {
                this.fieldsJoin.forEach((element) => {
                    var str = this.normalize_query(element).trim().split('\.');
                    if (!models[str[0]]) {
                        models[str[0]] = {};
                    }

                    if (!models[str[0]].attributes) {
                        models[str[0]].attributes = [];
                    }
                    models[str[0]].attributes.push(str[1]);
                });
            }

            if (this.filterJoin) {
                this.filterJoin.forEach((element) => {
                    var str = this.normalize_query(element).trim().split('.');
                    if (!models[str[0]]) {
                        models[str[0]] = {};
                    }

                    if (!models[str[0]].where) {
                        models[str[0]].where = [];
                    }

                    var query = element.replace(str[0] + '.', '');
                    models[str[0]].where.push(this.parse_where_expression(query));
                });
            }

            Object.keys(models).forEach(function (key, index) {
                var nameModel = key.charAt(0).toLocaleUpperCase() + key.slice(1);
                var alias = key.charAt(0).toLowerCase() + key.slice(1);
                var include = {
                    model: app.db.models[nameModel],
                    as: alias,
                    attributes: models[key].attributes,
                    where: models[key].where
                };
                includes.push(include);
            });
            return includes;
        },

        normalize_query(query) {
            return query.replace(/%([a-f0-9]{2})/gi, function (f, m1) { // NORMALIZA A QUERY PARA UTF-8
                return String.fromCharCode(parseInt(m1, 16));
            });
        },

        order_clause() {
            if (!this.order) {
                return [];
            }

            var order = [];
            this.order.split(',').forEach((element) => {
                var command = [];
                var str = element.trim().split(" ");

                var property = str[0];
                var typeOrder = "ASC";
                var model = undefined;

                if (str.length > 1) {
                    typeOrder = str[1];
                }

                if (property.indexOf('.') > -1) {
                    var query = property.split('.');
                    model = query[0].charAt(0).toLowerCase() + query[0].slice(1);
                    property = query[1];
                }

                if (model) {
                    command.push(model);
                }

                command.push(property);
                command.push(typeOrder);

                order.push(command);
            });

            console.log(order);

            return order;
        },

        isEmpty(){
            return !this.fields;
        }
    };

    if (reqQuery) {
        if (reqQuery.fields) {
            SearchModel.fields = reqQuery.fields;
            SearchModel.fieldsJoin = [];
        }

        if (reqQuery.sort) {
            SearchModel.sort = reqQuery.sort;
        }

        if (reqQuery.limit) {
            SearchModel.limit = reqQuery.limit;
        }
        else {
            SearchModel.limit = 10;
        }

        if (reqQuery.filter) {
            SearchModel.filter = reqQuery.filter;
        }

        if (reqQuery.offset) {
            SearchModel.offset = reqQuery.offset;
        }

        if (reqQuery.order) {
            SearchModel.order = reqQuery.order;
        }
    }

    return SearchModel;
}
