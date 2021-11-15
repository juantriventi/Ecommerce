const {body, check, validationResult} = require ("express-validator");
const { User, passValidator } = require("../services/users");
const { sessionManager } = require("./sessionManager");


const reglasValidacionUser = () => {
    return [
        body("userName").notEmpty().withMessage("Coloca tu usuario"),
		body("firstName").notEmpty().withMessage("Coloca tu nombre"),
		body("lastName").notEmpty().withMessage("Coloca tu apellido"),
		body("email")
			.notEmpty().withMessage("Tenes que poner un mail").bail()
			.isEmail().withMessage("Tienes que poner un formato de correo electronico valido"),
		body("street").notEmpty().withMessage("Coloca tu calle"),
		body("number").notEmpty().withMessage("Coloca el npumero de tu calle"),
		body("city").notEmpty().withMessage("Coloca tu ciudad"),
		body("state").notEmpty().withMessage("Coloca tu provincia"),
		body("cp").notEmpty().withMessage("Coloca tu código postal"),
		body("phone_number").notEmpty().withMessage("Coloca tu número de teléfono"),
		body("password").notEmpty().withMessage("Pon una contraseña"),
		body("confirmPassword").notEmpty().withMessage("Repite la contraseña anterior")
    ]
}

const validacionUserMiddleware = async(req, res, next) => {
    const errors = validationResult(req);

    const email = req.body.email;
    
    const user = await User.getByEmail(email);
    
    if(user){
        errors = {
            ...errors,
            email: {
                msg: "Este email ya está registrado",
            }
        }
    }


    const oldData = req.body;

    if(!errors.isEmpty()){
        console.log(errors);
        res.render("users/register", {errors: errors.mapped(), oldData});
    }else{
        next();
    }
}

const validacionAuthUser = async(req, res, next) => {
    const {email, password} = req.body;

    console.log(email);
    const user = await User.getByEmail(email);

    console.log(user);
    
    if(!user){
        console.log("error en el mail");
        res.render('users/login');
    }else if(!passValidator(password, user.password)){
        console.log('error en el pass');
        res.render('users/login');
    }else if(user){
        next();
    }
}

const userIsLoged = (req, res, next) => {
    if(!sessionManager.getAuth(req).isLoged){
        res.redirect("/");
    }

    next();
}

module.exports = {
    reglasValidacionUser, 
    validacionUserMiddleware,
    validacionAuthUser,
    userIsLoged,
}