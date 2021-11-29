const Product = require("../../services/products")

const IMAGES_FOLDER = `http://localhost:3030/images/products/`;

const productsApi = {
    
    list: async (req, res) => {
        let products = await Product.getAll()
        
        products = products.map(product => {
            product.image = IMAGES_FOLDER + product.image;
            return product;    
        });
        const total = products.length;
        
        res.status(200)
        res.json({
            meta:{
                total
            },
            data:{
                products
            },
            message: "ok"
        })
    } ,
    detail: async (req, res) => {
        const id = req.params.id
        let producto = await Product.getById(id)

        producto.image = IMAGES_FOLDER + producto.image;
        res.status(200)
        res.json ({
            data:{product: producto},
            message: "ok"
        })

    },
    getByName: async (req, res) => {
        let name = req.params.name
      
        try{
            let producto = await Product.search(name)
        
            producto.image = IMAGES_FOLDER + producto.image;
            res.status(200)
            res.json ({
            data:{product:producto},
            message: "ok"
           });

        } catch(error) {
            res.status(404)
            res.json ({
            message: `ERROR: Producto no encontrado`,
           });
        }
       
    }
}


module.exports = productsApi;