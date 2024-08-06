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
    if(err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL as id:", db.threadId);

//create a db
db.query(`CREATE DATABASE IF NOT EXISTS expense_tracker1`, (err, result) => {
    //error creating db
    if(err) return console.log("error creating database", err)

    //if no error creating db
    console.log("db expense_trcaker created/checked successifully");

    //select the db expense_tracker
    db.changeUser({database: 'expense_tracker1' }, (err, result) => {
        //if err changing db
        if(err) return console.log("error changing db", err)

        //if no error changing
        console.log("expense_tracker is in use");

        //create table
        const createUsersTable = `
        CREATE TABLE IF NOT EXIST users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            username VARCAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL
            )`;

        //querry table
        db.query(createUsersTable, (err, result) => {
            //if erro creating table
            if(err) return console.log("error creating table")
            
                //if no error creating table
                console.log("users table is created/checked successfully")
        })
    })
})
})


// running the server
app.listen(3000, () => {

    console.log("server is running on PORT 3000")
})

