const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

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
    },

    async signUp(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        // hash their password with a one way hash, generate random salt length 10
        const password = await bcrypt.hash(args.password, 10);
        // create the user and overwrite password with the hashed password
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: [`USER`] }
            }
        }, info);
        // create the JWT token and set it as a cookie on the response
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        ctx.response.cookie(`token`, token, {
            // disallow the cookie to be accessed via JS for security
            httpOnly: true,
            // set cookie to last 90 days
            maxAge: 1000 * 60 * 60 * 24 * 90
        });
        return user;
    },

    async signIn(parent, args, ctx, info) {
        const { email, password } = args;
        // ensure user exists with the given email
        const user = await ctx.db.query.user({ where: { email }});
        if( !user ) throw new Error(`No user found with email ${ email }`);
        // check password
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) throw new Error(`Incorrect password`);
        // create token and set the cookie
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        ctx.response.cookie(`token`, token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90 // 90 days
        });
        return user;
    }
};

module.exports = Mutation;
