const userDataMapper = require('../dataMappers/userDataMapper');
const bcrypt = require('bcryptjs');

module.exports = {

    async getAllUser(_, response, next) {
        try {
            const users = await userDataMapper.getAllUsers();
            response.json({
                message: 'All users',
                data: users
            });
        } catch (error) {
            // Les middlewares pour la gestion d'erreur sont dans une file à part
            // pour partir dans cette file, on appele next en donnant en paramètre
            // l'erreur produite
            next(error);
        }
    },

    async getUserById(request, response, next) {
        try {
            // J'extrait en décomposition la propriété userId dans mes params
            const { userId } = request.params;

            const user = await userDataMapper.getUserById(userId);

            if (! user) {
                // En appelant next() je vais chercher le prochain middleware qui répond
                // a ma route
                // Le dernier middleware qui répond à toutes les routes est donc le middleware
                // 404
                response.locals.notFound = "user";
                next();
                return;
            }

            response.json({
                message: 'User by id',
                data: user
            });

        } catch(error) {
            next(error);
        }
    },

    async updateUserById(request, response, next) {
        try {
            const { userId } = request.params;
            const userInfo = request.body;
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(userInfo.password, saltRounds);
            userInfo.password = hashedPassword;
            const user = await userDataMapper.updateUserById(userId, userInfo);
            if(!user) {
                response.locals.notFound = "User not exist"
            }
            response.json({
                message: 'User update',
                data: user });
        } catch (error) {
            next(error)
        }
    },

    async deleteUserById(request, response, next) {
        try {
            const { userId } = request.params;
            const deleteUser = await userDataMapper.deleteUserById(userId);

            if(deleteUser == null) {
                response.locals.notFound = "user unknow";
                next();
                return;
            }
            response.json({
                message: `User ${userId} deleted`,
                data: deleteUser });
        } catch (error) {
            next(error)
        }
    },
}