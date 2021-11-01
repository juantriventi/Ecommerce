
const fs = require('fs');
const path = require('path');
const Product = require("./../src/database/models/product");

const productsFilePath = path.join(__dirname, '../src/database/db_productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




const Producto = {
    getAll:  () => {
         Product.findAll().then(data => {
             console.log(data)
         })
        return productos
    },

    getById: (id) => {
        const producto = productos.find( prod => String(prod.id) === id);
        return producto;
    },

    getByNombre: (nombre) => {
        const producto = productos.find(prod => prod === nombre)
    },
    modifiedAll: (productos)=>{
        fs.writeFileSync(productsFilePath, JSON.stringify(productos))
    },
}

module.exports = Producto;