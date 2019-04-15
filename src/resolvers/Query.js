const { forwardTo } = require(`prisma-binding`);

const Query = {

    // forward index and show actions to prisma since no auth needed
    photos: forwardTo(`db`),
    photo: forwardTo(`db`),

    me(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            // return null if there is no userId
            return null;
        }
        // otherwise return current user
        return ctx.db.query.user({
            where: { id: ctx.request.userId }
        }, info);
    }

};

module.exports = Query;
