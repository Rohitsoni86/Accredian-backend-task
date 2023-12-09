const mysql = require("mysql2")
require("dotenv").config();


//const poolConnection = mysql.createPool({
//    host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
// }) 

const poolConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'application',
    password: 'YourRootPassword',
})


// Sample Try

// try {   let sqlQuery = "Select * FROM users"
//    let usersF = poolConnection.execute(sqlQuery, (err, results) => {
//        if (err) console.log(err);
//        console.log(results);
//    })

//    console.log(usersF);
//} catch (err) {
 //   console.log(err);
//} 


module.exports = poolConnection.promise()