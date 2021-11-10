const path = require('path');
let db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Brand = db.Brand;



const brandController = {

    list: (req, res) => {
        Brand.findAll()
        .then(brands => {
            res.render('products/brandList.ejs', {brands})
        });
    },
    detail: (req, res) =>{
    Brand.findByPk(req.params.id)
    .then(brand => {
        res.render('products/brandDetail.ejs', {brand});
      });
    },
    search: (req, res) =>{},
    
    //CRUD
    add: (req, res) =>{
        res.render('products/brandAdd.ejs');
    },
    create:(req, res) =>{
         Brand.create({name: req.body.name})
        .then(()=> {
            return res.redirect('/brand')})            
        .catch(error => res.send(error))
    },
    edit: (req, res) =>{
        let brandId = req.params.id;
        Brand         
        .findByPk(brandId)
        .then(Brand => {
            return res.render(path.resolve(__dirname, '..', 'views',  'products/brandDelete'), {Brand})})
        .catch(error => res.send(error))
    },
    update: (req, res) =>{
        let brandId = req.params.id;
        Brand.update(
            {
                name: req.body.name
            },
            {
                where: {id: brandId}
            }
        )
        .then(()=> {
        return res.redirect('/brand')})    
        .catch(error => res.send(error))
    },

    //delete: (req, res) =>{},
    destroy: (req, res) =>{
        let brandId = req.params.id;
        Brand.destroy({where: {id: brandId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/brand')})
        .catch(error => res.send(error)) 
    },

    // END CRUD



}

module.exports = brandController;