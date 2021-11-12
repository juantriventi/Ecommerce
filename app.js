const express=require("express");
const app= express();
const path=require('path');
const cors=require("cors");
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require("cookie-parser")
const port=process.env.port || 3030;

const logMiddleware = require("./middlewares/logMiddleware");


const createErrors = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logMiddleware);
app.use(methodOverride('_method'));
app.use(cors())

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")
app.use(session({
    secret:"shh it´s a secret", 
    resave: false,
    saveUninitialized: false,
    }))
app.use(cookies())
app.use(userLoggedMiddleware)

// app.use("/", mainRoutes);
// app.use("/products", productsRoutes);
// app.use("/users", usersRoutes);

const mainRoutes = require("./routes/mainRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const colorRoutes = require("./routes/colorRoutes.js");
const brandRoutes = require("./routes/brandRoutes.js");
const sizeRoutes = require("./routes/sizeRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");


app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)
app.use("/colors", colorRoutes)
app.use("/brands", brandRoutes)
app.use("/sizes", sizeRoutes)
app.use("/categories", categoryRoutes)

// app.use('/', (req, res) => res.json({ clave: "con el server" })); 
app.listen(port, () => 
console.log("Levantando un servidor en el puerto" + port)
)


