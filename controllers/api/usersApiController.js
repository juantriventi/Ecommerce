const path = require("path")
let db = require("../../src/database/models")
const sequelize = db.sequelize
//const pagination = require("./paginationUsers")

const User = db.User

const usersAPIController = {

    list: (req, res) => {
        if ( !req.query.query ) {
            let users = User.findAll({ attributes:['id', 'firstName', 'lastName','email']})
            .then(users => {
                let response = {
                    meta: {
                        status : 200,
                        total: users.length,
                        url: 'api/users'
                    },
                   // data: users
                   data: {
                    list: []
                }
                }
                users.forEach(user => {
                    response.data.list.push({
                        id: user.id,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,                        
                        detail: `/api/users/${user.id}`
                    })
                    return user
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
    search:async (req,res) => {
        const name = req.params.name

        let user = null;
        return  User.findOne({
            where: {
                firstName: name
            }
        })
        .then(dataUser => {
            if(dataUser !== null){
                res.status(200);
                res.json({
                    data: {
                        user: dataUser
                    },
                    message: 'ok'
                })
            }else{
                res.status(404);
                res.json({
                   
                    message: 'ERROR: Usuario no encontrado'
                })
            }
        })
        .catch(err => 
            {
                res.status(404);
                res.json({
                    message:'ERROR: de sistema en usuarios search'
                })   
            }
            
            ); 
                /* 
        try{
            console.log(usuario);
            let usuario = await User.search(name)
            
            res.status(200)
            res.json ({
            data:{user:usuario},
            message: "ok"
           });

        } catch(error) {
            res.status(404)
            res.json ({
            message: `ERROR: Usuario no encontrado`,
           });
        }  */


    },
    detail: (req, res) =>{
        let userId = req.params.id;
        User.findByPk(userId, 
            {
            //     include : ['rol']
            attributes:['firstName', 'lastName', 'userName', 'email', 'userName', 'street', 'number', 'floor', 'apartment', 'city', 'state', 'cp', 'phone_number']
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/users/:id'
                    },
                    data: {
                        userId : user.id,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        userName : user.userName,
                        email : user.email,
                        street: user.street,
                        number: user.number,
                        floor: user.floor,
                        apartment: user.apartment,
                        city: user.city,
                        state: user.state,
                        cp: user.cp,
                        phone_number: user.phone_number,
                    }
                }
                res.json(respuesta);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
    },
    
    count: (req, res) =>{
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users/count'
                },
                data: {users}
            }
         res.json("El total de usuarios es " + respuesta.meta.total );
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    }
}

module.exports = usersAPIController;