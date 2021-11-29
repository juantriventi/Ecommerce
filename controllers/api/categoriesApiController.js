const path = require("path")
const categorias = require("../../services/categorias")
let db = require("../../src/database/models")
const sequelize = db.sequelize

const Categorias = db.categoria

const categoriesAPIController = {

    list: (req, res) => {
        if ( !req.query.query ) {
            let categorias = Categorias.findAll({ attributes:['id', 'categoria']})
            .then(categorias => {
                let response = {
                    meta: {
                        status : 200,
                        total: categorias.length,
                        url: 'api/categorias'
                    },
                   
                   data: {
                    list: []
                }
                }
                categorias.forEach(categorias => {
                    response.data.list.push({
                        id: categorias.id,
                        categoria: categorias.categoria,                                 
                        
                    })
                    return categorias
                });
                return res.json(response);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
        } else {
            pagination(req, res);
        }
    },
    
    
    count: (req, res) =>{
        Categorias.findAll()
        .then(categorias => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categorias.length,
                    url: 'api/categorias/count'
                },
                data: {categorias}
            }
         res.json("El total de categorias es " + respuesta.meta.total );
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    }
}

module.exports = categoriesAPIController;