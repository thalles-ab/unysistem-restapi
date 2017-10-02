import http from "https";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);


let info = {
    domain: "https://esesp.es.gov.br",
    path : "/Noticias",
    tagArea : "article.projection-page > ul[class!=\"pager\"]",
    tagItem : "li",
    tagImg : "img",
    tagBody: "article > div:first > div:last > p",
    tagHeader: "header > div.row > div",
    tagDate : "div",
    tagLink : "h1 > a"
};

module.exports = app =>{

    var buscarNoticias = () => {
        return new Promise(function(resolve, reject) {
            var noticias = [];

            var req = http.get(info.domain+info.path, (resExt) => {

                var htmlOut = "";
                resExt.on('data', (d) => {
                    htmlOut += d;
                });

                resExt.on('end', () => {
                    var element = $(htmlOut).appendTo('body');
                    var area = element.find(info.tagArea);

                    // AREA DA PAGINA ONDE ENCONTRA-SE AS POSTAGENS
                    area.find(info.tagItem).each((idx, val) =>{
                        var noticia = {};

                        // TITULO DA POSTAGEM
                        var header = $(val).find(info.tagHeader).filter(function(){
                            return $.trim($(this).html()) !== "";
                        });

                        var link = header.find(info.tagLink);

                        noticia.titulo = link.html();
                        noticia.link = info.domain + link.attr('href');
                        noticia.data = header.find(info.tagDate).text();

                        noticia.data = noticia.data.replace(/(?:\r\n|\r|\n)/g, ''); // remove \n
                        noticia.data = noticia.data.replace(/\s{2,}/g, ' '); // remove espaços duplicados

                        // CONTEUDO DA POSTAGEM
                        var content = $(val).find(info.tagBody);
                        content.find('a[href="'+link.attr('href')+'"]').remove();

                        noticia.conteudo = content.text();

                        noticias.push(noticia);
                    });
                    resolve(noticias);
                });

            });

            req.end();
        });
    };

    var baixarImagemNoticia = (noticia) => {
        return new Promise(function(resolve, reject) {
            var req = http.get(url, (resExt) => {

                var htmlOut = "";
                resExt.on('data', (d) => {
                    htmlOut += d;
                });

                resExt.on('end', () => {
                    var element = $(htmlOut).appendTo('body');
                    noticia.linkImg = element.find('.photographer').parent().find(info.tagImg).attr('src');
                    resolve(noticia);
                });

            });

            req.end();
        });
    };

    app.route("/noticias").get((req, res) => {
        buscarNoticias().then(data =>{
            res.status(200).json(data);
        });
    });

};