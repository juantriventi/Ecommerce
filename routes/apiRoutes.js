const express = require ("Express");
const productsapi = require ("./api/products.api")
const apiRouter = express.Router();
const imagesapi = require ("./api/imagesapi")

apiRouter.use("/products", productsapi)
apiRouter.use("/images" , imagesapi)


module.exports = apiRouter;