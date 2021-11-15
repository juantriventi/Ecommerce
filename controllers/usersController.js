const { validationResult } = require('express-validator');
const { sessionManager } = require('../middlewares/sessionManager');
const {User, passValidator, hashPassword} = require("../services/users");


const controlador = {
    list: async(req,res) => {
        const users = await User.getAll();
        res.render("users",{users});
    },
    

    detail: async (req, res) => {
        
        const id = req.params.id;
        const user = await User.getById(id);

        res.render('users/detail', {user});
    },

    login: async(req, res) => {
        res.render('users/login');
    },


    register: async(req, res) => {
        res.render('users/register');
    },
    // crea un usuario en la base de datos
    store: async(req, res) => { 
        let {
            firstName,
            lastName,
            userName,
            email,
            street,
            number,
            city,
            state,
            floor,
            apartment,
            cp,
            phone_number,
            password 
        } = req.body;

        number = parseInt(number);
        floor = parseInt(floor);
        phone_number = parseInt(phone_number);
        
        password = hashPassword(password);

        const user = {
            firstName,
            lastName,
            userName,
            email,
            street,
            number,
            city,
            state,
            floor,
            apartment,
            cp,
            phone_number,
            password 
        };

        await User.register(user);

        res.render('users/login');
    },


    login: async(req, res) => {
        res.render('users/login');
    },


    auth: async(req, res) => {

        const {email} = req.body;

        const user = await User.getByEmail(email);
        sessionManager.setAuthLikeUser(req, user);

        res.redirect('detail/' + user.id);
        
    },

    logout: async(req, res) => {

        sessionManager.authDestroy(req);
        res.redirect('/');
    },

    delete: async(req, res) => {
        const id = req.params.id;
        const user =await User.getById(id);
        await User.remove(user);

        sessionManager.authDestroy(req);
        res.redirect("/");
    }

}
    module.exports = controlador