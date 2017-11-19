import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

module.exports = app => {
    app.set('port', 8080);//porta do server
    app.set('json spaces', 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(cors({
        //origin: ["http://localhost:3001"],
        methos: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    app.use(fileUpload());
};
