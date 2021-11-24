const express=require("express");
const mainRoutes = require("./routes/mainRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const logMiddleware = require("./middlewares/logMiddleware");
const productsApiRouter = require("./routes/api/products.api");
const apiUserRouter = require("./routes/api/usersApi");
const cors = require("cors");
const apiRouter = require ("./routes/apiRoutes");
const createErrors = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');


const app= express();
const port=3030;
const path=require('path');
const { sessionConfig, sessionMiddleware } = require("./middlewares/sessionManager.js");
const router = require("./routes/productsRoutes.js");
const productsApi = require("./controllers/api/products.controller.api.js");
const usersApi = require("./controllers/api/usersApiController.js")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session(sessionConfig));
app.use(sessionMiddleware);

app.use(logMiddleware);
app.use(express.urlencoded({ extended:false }));

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/api", apiRouter);
app.use("/api/products", productsApiRouter)
app.use('/api/users', apiUserRouter);
app.use('/', (req, res) => res.json({ clave: "con el server" })); 
app.listen(port, () => 
console.log("Levantando un servidor con Express en el puerto" + port)
)

