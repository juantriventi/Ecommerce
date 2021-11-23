const Product = require("../../services/products")

const productsApi = {
    
    list: async (req, res) => {
        const products = await Product.getAll()
        res.status(200)
        res.json({
            data:{products},
            message: "ok"
        })
    } ,
    detail: async (req, res) => {
        const id = req.params.id
        const Producto = await Product.getById(id)
        image = "localhost:3030/images/products/" + producto.image
        producto.image = image
        res.status(200)
        res.json ({
            data:{product: Producto},
            message: "ok"
        })

    },
    getByName: async (req, res) => {
        const name = req.body.name
        const producto = await Product.getByNombre(name)
        image = "localhost:3030/images/products/" + producto.image
        producto.image = image  
        res.status(200)
        res.json ({
        data:{product:producto},
        message: "ok"
       })
    }
}


module.exports = productsApi;