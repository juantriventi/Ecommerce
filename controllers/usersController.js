const path = require("path");
let db = require("../src/database/models")
const sequelize = db.sequelize;
const {Op} = require("sequelize")

const bcryptjs = require("bcryptjs")
const { validationResult } = require('express-validator');

const User = db.User;


const usersController = {

    list: (req,res) => {
        User.findAll()
        .then(users => {
            res.render("users/users", {users})
        });
    },

    detail: (req,res) => {
        let userId = req.params.id; 
        User.findByPk(userId)
        .then(users => {
            res.render("users/userDetail", {users})
        })
    },

    login: (req,res) => {
        return res.render("users/login");
    },

    processRegister: async (req,res) => {
        console.log("Entre en el create user");

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        console.log("Antes de ver si existe el mail");

        // Veo si el mail ya esta registrado
        let userInDB = await User.findOne({
            where: {email:req.body.email}
        })
        if (userInDB) {
            return res.render("users/register", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body
            });
        }

        console.log("Antes de crear el usuario");

        // Si pasa las validaciones, crea el usuario y encripta la contraseña
        try {
            let userCreated = await User.create({
                firstName: req.body.firstName, 
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                street: req.body.street,
                number: req.body.number,
                city: req.body.city,
                state: req.body.state,
                floor: req.body.floor,
                apartment: req.body.apartment,
                cp: req.body.cp,
                phone_number: req.body.phone_number,                
                password: bcryptjs.hashSync(req.body.password,10)
            })

            console.log(userCreated)
        
            return res.redirect("/users/login")

        }
        catch(error) {
            res.send(error)
        }
    },

    register: (req,res) => {
        return res.render("users/register");
    },

    edit: (req,res) => {
        let userId = req.params.id;
        let promUsers = User.findByPk(userId)
        Promise
        .all([promUsers])
        .then((users) => {
            return res.render(path.resolve(__dirname,"..","views","users/userEdit"), {users,userId})
        })
        .catch(error => res.send(error))
    },

    update: async (req,res) => {
        try{
            let user = req.body
            let userId = req.params.id 
            const userUpdate = await User.update(
                {
                    firstName: req.body.firstName, 
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    street: req.body.street,
                    number: req.body.number,
                    city: req.body.city,
                    state: req.body.state,
                    floor: req.body.floor,
                    apartment: req.body.apartment,
                    cp: req.body.cp,
                    phone_number: req.body.phone_number, 
                    password: req.body.password,
                    confirmarPassword: req.body.confirmarPassword,
                    },
                {
                    where: {id:userId}
                }
            );
            return res.redirect("/users")
        } catch(error) {
            res.send(error)
        }
    },
    
    delete: (req,res) => {
        
    },

    destroy: (req,res) => {
        let userId = req.params.id
        User.destroy({
            where: {id:userId}, force:true
        })
        .then(()=> {
            return res.redirect("/users")
        })
        .catch(error => res.send(error))
              
    },

    loginProcess: async (req,res) => {
         // Busca el usuario por mail y si lo encuentra compara su contraseña
        try{ 
            let userToLogin = await User.findOne({where:{email:req.body.email}});
            if(userToLogin){
                let isPassword = bcryptjs.compareSync(req.body.password, userToLogin.password); 
                if(isPassword) {
                    delete userToLogin.password;
                    req.session.userLogged=userToLogin;

                    if(req.body.remember_user) {
                        res.cookie("userEmail", req.body.email, {maxAge:(1000*60)*60})
                    }
                    return res.redirect("/users/profile");
                }
                return res.render("users/login", {
                    errors:{
                        email:{
                            msg: "Las credenciales son inválidas"
                        }
                    }
                })
            }
            return res.render("users/login", {
                errors: {
                    email:{
                        msg: "No se encuentra este email en nuestra base de datos"
                    }
                }
            })
        }
        catch(error) {
            console.log(error)
        }
    },

    profile: (req,res) => {
        return res.render("users/profile", {
            user: req.session.userLogged 
        });
        
    },

    logout: (req,res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/")
    }
}
    module.exports = usersController;