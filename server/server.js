const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.get("/move", (req, res) => {
    axios
        .get(
            "https://filmy.programdemo.pl/MyMovies"

        )
        .then((response) => res.json(response.data))
        .catch((error) => res.sendStatus(500));
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});