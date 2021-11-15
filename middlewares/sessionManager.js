const session = require('express-session');

const sessionConfig = {
    secret: 'heavy metal is the law and that is not a secret',
    resave: false,
    saveUninitialized: true,
}

const sessionMiddleware = (req, res, next) => {
        
    if(!req.session || !req.session.auth){
        sessionManager.setAuthLikeGuest(req);
    }

     res.locals.auth = sessionManager.getAuth(req);
     console.log(res.locals.auth.isLoged);
     res.locals.message = sessionManager.getMessage(req);
     next();
}

const sessionManager = {
    setMessage: (req, message) => {
        req.session.message = message;
    },
    getMessage: (req) => {
        return req.session.message;
    },
    cleanMessage: (req) => {
        req.session.message = '';
    },
    setAuthLikeGuest: (req) => {
        req.session.auth = {isLoged:false};
    },
    setAuthLikeUser: (req,user) => {
        
        req.session.auth = {...req.session.auth, user, isLoged:true};
    },
    getAuth: (req) => {
        return req.session.auth;
    },

    
    authDestroy: (req) => {
        req.session.destroy();
    }
}

module.exports = {sessionConfig, sessionMiddleware, sessionManager};