import cors from "cors";
import bodyParser from "body-parser";

module.exports = app => {
    app.set('port', 8080);
    app.set('json spaces', 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(cors({
        //origin: ["http://localhost:3001"],
        methos: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type", "Authorization"]
    }));
    app.use((req, res, next) => {
       delete req.body.id;
       next();
    });
}