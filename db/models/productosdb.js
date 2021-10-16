module.exports = function(sequelize, dataTypes){
    let alias = "Productos";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.NUMBER
        }
     
    }

    return Productos;
}
