require("dotenv").config();
const path = require('path');
const express = require("express");
const router = require("./routes/apiRoutes");

const port = process.env.PORT || 3001;

const app = express();

app.use("/api/", router);

app.use('/',express.static(path.join(__dirname,'client','build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});