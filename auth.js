import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

     const strategy = new Strategy(params, (payload, done) => {
         return	done(null,	{
             id:2,
             email:	'thallesmweb@gmail.com'
         });
    });

     passport.use(strategy);

     return {
         initialize: () => {
            return passport.initialize();
         },
         authenticate: () => {
             return passport.authenticate("jwt", cfg.jwtSession);
         }
     };
};
