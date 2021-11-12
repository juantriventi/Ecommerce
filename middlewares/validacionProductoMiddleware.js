const {body, check, validationResult} = require ("express-validator");
var expressValidator = require('express-validator');

const reglasValidacion = ()=> {
        return [
            body ("nombre") 
                .isLength({min:5})
                .withMessage("Debe tener al menos 5 caracteres"),
                
            body ("descripcion") 
                .isLength({min:20})
                .withMessage("Debe tener al menos 20 caracteres"),    
            
              
            body ("imagen")
                
                .notEmpty()
                .withMessage("Seleccione una imagen valida"),
            
            /*body('imagen').custom((imagen,{req}) => {
                console.log(imagen)
                if (imagen !== req.body.imagen) {
                  throw new Error('Elegi un formato valido');
                }
            
                return true;*/
            ]
}

const validacionProductoMiddleware = (req, res, next) =>{
    console.log(req.file)
    const errors = validationResult(req)
    if (!errors.isEmpty()){
     /*   if (req.params.id) {
            res.redirect("/products/update/" + req.params.id)
        }else {
            res.redirect ("/products/create")
       }*/
       res.render("products/create", {errors:errors.array()})
    }else {
       next()
    }
}
module.exports = {reglasValidacion, validacionProductoMiddleware};