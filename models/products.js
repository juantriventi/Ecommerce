const fs = require('fs');
const path = require('path');
const {Product, Brand} = require("./../src/database/models/index");

const productsFilePath = path.join(__dirname, '../src/database/db_productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const Producto = {
    getAll:  async() => {
         const products = await Product.findAll({include: [{model:Brand}]});

         products.forEach(product => {
            product.getBrand().then(data => {product.Brand = data});
         });
        return products
    },

    search: async(query) => {
        const product = await Product.findOne({ where: { name: query } })
        return product;
    },

    getById: async(id) => {
        const producto = await Product.findByPk(id);
        return producto;
    },

    store: async(producto) => {
        await Product.create(producto);
    },

    getByNombre: (nombre) => {
        const producto = productos.find(prod => prod === nombre)
    },
    modifiedAll: (productos)=>{
        fs.writeFileSync(productsFilePath, JSON.stringify(productos))
    },
}

module.exports = Producto;
