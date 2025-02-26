const mysql=require('mysql2')
const dbName='back-end_web_dev'
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:dbName
})

db.connect((err)=>{
    if(err) console.log(err)
    console.log(`Connecting '${dbName}' database.`)
})
/*
db.execute(`
    Create table if not exists users(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(30) NOT NULL
    )`,(err)=>{
        if(err) throw err
        console.log("Create to users table.")
})

db.execute(`
    CREATE TABLE IF NOT EXISTS posts(
        id int(11) AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50)  NOT NULL UNIQUE,
        content VARCHAR(400) NOT NULL,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        userid int(11) UNSIGNED NOT NULL,
        FOREIGN KEY (userid) REFERENCES users (id)
    )`,(err)=>{
        if(err) console.log(err)
        else console.log('Create posts table..')
    })
*/
module.exports=db