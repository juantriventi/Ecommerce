const express=require("express");
const mainRoutes = require("./routes/mainRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const logMiddleware = require("./middlewares/logMiddleware");


const createErrors = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');

//validaciones producto
const { body } = require("express-validator");

app.post("/products/create",[
  body("nombre", "Ingresa un nombre de producto")
  .exists()
  .isLength({min:4}),
  body("descripcion", "Ingrese una descripcion correcta")
  .exists()
  .isLength({min:5}),
  body("precio", "Ingrese un valor númerico")
  .exists()
  .isNumeric()
], (req, res) => {
    const errors =validationResults(req)
    if (!errors.isEmpty()){
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        res.render("index", {validaciones:validaciones, valores:valores})
    }else{
        res.send("validacion exitosa")
    }
})




const app= express();
const port=3030;
const path=require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logMiddleware);
app.use(express.urlencoded({ extended:false }));

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use('/', (req, res) => res.json({ clave: "con el server" })); 
app.listen(port, () => 
console.log("Levantando un servidor con Express en el puerto" + port)
)


