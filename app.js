const express=require("express");
const app= express();
const port=3030;
const path=require('path');
const mainRoutes = require("./routes/mainRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", mainRoutes);

app.use("/products", productsRoutes);

app.use("/users", usersRoutes);

app.listen(port, () => 
console.log("Levantando un servidor con Express en el puerto"+port)
)
