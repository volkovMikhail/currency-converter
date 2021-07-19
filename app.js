require("dotenv").config();
const express = require("express");
const router = require("./routes/apiRoutes");

const port = process.env.PORT || 3001;

const app = express();

app.use("/api/", router);

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});

app.get("*", (req, res) => {
    res.status(404).end("404");
});
