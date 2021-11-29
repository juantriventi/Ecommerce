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
    },
    edit: async (req,res) => {
        
        const id = req.params.id
        const usuario = await User.getById(id)
        res.render("users/userEdit", {users:usuario})
    },
    put: async (req,res) => {
        const id = req.params.id
        let usuario = await User.getById(id)
        if (usuario !== null){
            let {firstName,lastName,email,street,number,floor,apartment,city,state,cp,phone_number,password,confirmPassword} = req.body;
            
            let usuarioEditado = null;
           
            if (password === ''){
                 usuarioEditado = 
            {
                id: usuario.id,
                firstName,
                lastName,
                email,
                street,
                number,
                floor,
                apartment,
                city,
                state,
                cp,
                phone_number,
                password: usuario.password
            }

           }else if (password !== '' &&  password === confirmPassword){
             usuarioEditado = 
            {
                id: usuario.id,
                firstName,
                lastName,
                email,
                street,
                number,
                floor,
                apartment,
                city,
                state,
                cp,
                phone_number,
                password
            }
           }
          
           console.log(usuarioEditado);
           await User.update(usuarioEditado)
           res.redirect("/users/detail/" + usuarioEditado.id)
        } res.send('<h1 style="color:red;">No se pudo actualizar el usuario </h1>')
    }

}
    module.exports = controlador