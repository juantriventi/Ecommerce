const bcryptjs = require('bcryptjs');
const db = require('../src/database/models');

const hashPassword = (password) => {
    return bcryptjs.hashSync(password,10);
}

passValidator = (password, db_password) => {
    return bcryptjs.compareSync(password, db_password)
}

const User = {


    getAll: async() => {
        const users = await db.User.getAll();
        return users;
    },


    register: async (user) => {
        await db.User.create(user);
    },

    getByEmail: async(email) => {
        const user = await db.User.findOne({
            where: {
                email: email,
            }
        });

        return user;
    },


    getById: async(id) => {
        const user = await db.User.findByPk(id);
        return user;
    },


    update: async (user) => {
        await db.User.update(
            user,
            {
                where: {
                    id:user.id,
                }
            });
    },


    remove: async(user) => {
        await db.User.destroy({where: {id:user.id}});
    }
}

module.exports = {User, hashPassword, passValidator};