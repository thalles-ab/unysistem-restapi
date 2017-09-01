import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;

    app.post("/token", (req, res) => {
        if(req.body.email && req.body.password){
            const payload = 3;
            const email = req.body.email;
            const password = req.body.password;

            res.json({
                token:	jwt.encode(payload,	cfg.jwtSecret)
            });
        }
        else{
                res.sendStatus(401);
        }
    });
};