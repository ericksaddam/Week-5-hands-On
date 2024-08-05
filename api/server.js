const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());
dotenv.config()


//connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

//test connection
db.connect((err) => {
    //if connection does not work
    if(err) return console.log("error connecting to MYSQL")

    //Connection work
    console.log("connection to MYSQL as id: ", db.threadId);
})


// running the server
app.listen(3000, () => {

    console.log("server is running on PORT 3000")
})

