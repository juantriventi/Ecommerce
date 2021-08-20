const controlador = {

detalle: (req,res) => {
    res.render("products/detalle");
},
carrito: (req,res) => {
    res.render("products/carrito");
},
create: (req,res) => {
    res.render("products/create");
}
}

module.exports = controlador