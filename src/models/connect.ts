import { createConnection } from 'mysql2';


const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fatecsjc',
    database: 'pessoas'
})

connection.connect((err)=>{
    if(err) return console.log(err);
    console.log("conectou");
})

export default connection;