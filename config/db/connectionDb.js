import "dotenv/config"
import  pg  from "pg";

const pool = new pg.Pool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER, 
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    allowExitOnIdle: true
})

export default pool

/* try {
    await pool.query("SELECT NOW()"); //SELECT NOW() ES PARA DEJAR REGISTRADO A QUE HORA SE REALIZO LA CONSULTA EN POSTGRES
    console.log("Database connected"); // Y BUENO ESTO ES PARA VER QUE LA DATABASE ESTE CONECTADA
} catch (error) {
    console.error("Error connecting to database:", error);
} */