const { render } = require("ejs");
const { validationResult } = require("express-validator");
const Producto = require("../models/products");
const colores = require('../models/colores');
const categorias = require('../models/categorias');
const { v4: uuidv4 } = require("uuid");

const controlador = {
  index: (req, res) => {
    const listaProductos = Producto.getAll();
    res.render("products/list", {
      listaProductos: listaProductos,
    });
  },

  detalle: (req, res) => {
    const id = req.params.id
    const producto = Producto.getById(id);
    //res.send(producto);
    res.render('products/detalle', {producto: producto});
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
  store: (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      console.log(req.body);

      // al mapear creo un nuevo array sin modificar el existente
      let nuevaListaProductos = Producto.getAll().map((prod) => prod);
      const { nombre,precio, descripcion, categoria, color } = req.body;
      file = req.file;
      if(!file){
        // manejo algun error
      }
      let productoId = uuidv4(); // genero un id unico y aleatorio

      const nuevoProducto = {
        id: productoId,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        img: file.filename,
        categoria: categoria,
        color: color,
      };

      nuevaListaProductos.push(nuevoProducto);
      Producto.modifiedAll(nuevaListaProductos);
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