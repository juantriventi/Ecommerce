const imagesApiController = 
    {
    getByName : (req, res) => {
        const image = req.params.name
        const carpetaImagenes = __dirname + "/public/images/products"
        res.send(carpetaImagenes)
    }
    }

module.exports = imagesApiController