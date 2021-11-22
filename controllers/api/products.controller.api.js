const Product = require("../../services/products")

const productsApi = {
    
    list: async (req, res) => {
        const products = await Product.getAll()
        res.status(200)
        res.json({
            data:{products},
            message: "ok"
        })
    } 
}


module.exports = productsApi;