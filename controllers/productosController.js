const path = require("path");
const { render } = require("ejs");
const { validationResult } = require("express-validator");
const Producto = require("../src/database/models/product");
const colores = require('../src/database/models/color');
const categorias = require('../src/database/models/category');
const { v4: uuidv4 } = require("uuid");
const {Op} = require("sequelize")

const controlador = {
  index: async (req, res) => {
    const listaProductos = await Producto.findAll();
    res.render("products/list", {
      listaProductos: listaProductos,
    });
  },

  search: async(req, res) => {
    const {query} = req.body;
    console.log(query);
    const product = await Producto.search(query);

    if(product === null){
      res.send('producto no encotrado');
    }else {
      res.redirect(`/products/detalle/${product.id}`);
    }    
  },

  detalle: async(req, res) => {
    const id = req.params.id
    const producto = await Producto.getById(id);
    //res.send(producto);
    res.render(`products/detalle`, {producto});
  },
  carrito: (req, res) => {
    res.render("products/carrito");
  },
  create: (req, res) => {
    res.render("products/create", {
      colores: colores,
      categorias: categorias
    });
  },
  store: async(req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    
    if (errors.isEmpty()) {

      // al mapear creo un nuevo array sin modificar el existente
      const { nombre,precio, descripcion} = req.body;
      file = req.file;
      if(!file){
        // manejo algun error
      }
     

      const nuevoProducto = {
        name: nombre,
        price: precio,
        description: descripcion,
        image: file.filename,
        stock: 1000
        //categoria: categoria,
       // color: color,
      };

      Producto.store(nuevoProducto);  
    } else {
      render("product-form", {
        errors: errors.array(),
      });
    }
    res.redirect("/");
  },

  update: (req, res) => {
    const id = req.params.id
    const producto = Producto.getById(id);
    console.log(producto);
    //res.send(producto)
    res.render('products/create', {
      producto: producto,
      colores: colores,
      categorias: categorias
    });
  },

  put: (req, res) => {
    const id = req.params.id;
    const producto = Producto.getById(id);

    const {nombre, categoria, precio, color, descripcion} = req.body;

    file = req.file;
    if (file){
      producto.img = file.filename;
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.descripcion = descripcion;
    producto.categoria = categoria;
    producto.color = color;

    listaProductos = Producto.getAll();
    listaProductos.forEach(prod => {
      if(prod.id === producto.id){
        prod = producto
      }
    });

    Producto.modifiedAll(listaProductos);

    res.redirect('/');
  },

  remove: (req, res) => {
      const id = req.params.id;
      //const producto = Producto.getById(id);
      const listaProductos = Producto.getAll().filter(prod => prod.id != id);
      Producto.modifiedAll(listaProductos);
      res.render('products/list', { listaProductos: listaProductos })
  }
};

module.exports = controlador;