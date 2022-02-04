const express = require("express");
const mongooes = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();

const mongUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongooes.connect(mongUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => {
        console.error("Could not connect to MongoDB...", err);
        setTimeout(connectWithRetry, 5000);
    });
}

app.get("/", (req, res) => {
    res.send(`<h2>Hello Mamur beta</h2>`)
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));