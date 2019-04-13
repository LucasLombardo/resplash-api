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
    }

};

module.exports = Mutation;
