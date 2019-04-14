const cookieParser = require(`cookie-parser`);

require(`dotenv`).config({ path: `.env` });
const createServer = require(`./createServer`);
const db = require(`./db`); // eslint-disable-line

const server = createServer();

// middleware to handle JWT cookies
server.express.use(cookieParser());

server.start({
    cors: {
        // restricts api access to frontend url
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
},
options => { console.log(`Server is now running on at http://localhost:${options.port}`); }
);
