const express = require("express");
const mongooes = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    REDIS_IP, 
    REDIS_PORT, 
    SESSION_SECRET 
} = require("./config/config");

const postRouter = require("./routes/post.route");
const userRuter = require("./routes/user.route");


let RediseStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_IP,
    port: REDIS_PORT
});


const app = express();

const mongUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectMongoWithRetry = () => {
    mongooes.connect(mongUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => {
            console.error("Could not connect to MongoDB...", err);
            setTimeout(connectMongoWithRetry, 5000);
        });
};

connectMongoWithRetry();

app.use(session({
    store: new RediseStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60 * 1000
    }
}))

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<h2>Hello Mamur beta</h2>`)
});

app.use("/api/v1/posts", postRouter, );
app.use("/api/v1/users", userRuter);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));