
const fs = require('fs');
const path = require('path');
const {Product, Brand} = require("./../src/database/models/index");

const { body, validationResult } = require('express-validator');

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

    getByNombre: async(nombre) => {
        const producto = productos.find(prod => prod === nombre)
    },

    update: async(producto) => {
        const {
            name, 
            price,
            image, 
            description} = producto;

        await Product.update(
            {
                name,
                image,
                price,
                description,
            }, 
            {
                where: {
                    id:producto.id,
                }
            });
    },
    

    remove: async (producto) => {
      await Product.destroy({where:{id:producto.id}})
    }
}

module.exports = Producto;

