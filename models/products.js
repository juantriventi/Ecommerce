
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../db/db_productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const Producto = {
    getAll: () => {
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