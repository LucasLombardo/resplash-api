const Mutation = {

    async createPhoto(parent, args, ctx, info) {
        const photo = await ctx.db.mutation.createPhoto({
            data: { ...args.data }
        }, info);
        return photo;
    },

    updatePhoto(parent, args, ctx, info) {
        // copy the updates and delete the id
        const updates = { ...args.data };
        delete updates.id;
        // select the photo based on the id and update it
        return ctx.db.mutation.updatePhoto({
            where: { id: args.data.id },
            data: updates
        }, info);
    },

    async deletePhoto(parent, args, ctx, info) {
        const where = { id: args.id };
        // since this is intermediary query, we have to manually pass the
        // the raw graphql { id title } rather than just passing info param
        const photo = await ctx.db.query.photo({ where }, `{ id title }`);
        // delete the photo
        return ctx.db.mutation.deletePhoto({ where }, info);
    }

};

module.exports = Mutation;
