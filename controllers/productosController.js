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
  create: async(req, res) => {
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
      
      const image = req.file.filename;
     

      const nuevoProducto = {
        name: nombre,
        price: precio,
        description: descripcion,
        image,
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

  update: async (req, res) => {
    const id = req.params.id
    const producto = await Producto.getById(id);
    console.log(producto);
    res.render('products/create', {producto})
  },

  put: async(req, res) => {
    const id = req.params.id;
    const producto = await Producto.getById(id);

    const { nombre, precio, descripcion} = req.body;
    
    

    image = producto.image;

    if(typeof req.file !== 'undefined'){
      image = req.file.filename;
    }

    
     productoActualizado = {
      id:producto.id,
      name: nombre,
      price: precio,
      description: descripcion,
      image,
      stock: 1000
      //categoria: categoria,
     // color: color,
    };

   await Producto.update(productoActualizado);
    
    res.redirect('/products');
  },

  remove: async (req, res) => {
      const id = req.params.id;
      const producto = await Producto.getById(id);
      Producto.remove(producto)
        .then(()=> {
          res.redirect('/products') 
        })
        .catch((err)=>{
          res.send(err)
        });
      
  }
};

module.exports = controlador;