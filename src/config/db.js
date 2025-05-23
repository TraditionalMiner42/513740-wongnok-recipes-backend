import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "menu_sharing",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 8080
});

export default pool;
