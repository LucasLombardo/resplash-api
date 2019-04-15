const cookieParser = require(`cookie-parser`);
const jwt = require(`jsonwebtoken`);
require(`dotenv`).config({ path: `.env` });
const createServer = require(`./createServer`);
const db = require(`./db`); // eslint-disable-line

const server = createServer();

// middleware to handle JWT cookies
server.express.use(cookieParser());

server.express.use((req, res, next) => {
    // get JWT from users cookies
    const { token } = req.cookies;
    if(token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;
    }
    next();
});

server.start({
    cors: {
        // restricts api access to frontend url
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
},
options => { console.log(`Server is now running on at http://localhost:${options.port}`); }
);
