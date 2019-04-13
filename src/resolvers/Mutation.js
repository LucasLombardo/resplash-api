const Mutation = {

    async createPhoto(parent, args, ctx, info) {
        const photo = await ctx.db.mutation.createPhoto({
            data: { ...args.data }
        }, info);
        return photo;
    } 
  
};

module.exports = Mutation;
