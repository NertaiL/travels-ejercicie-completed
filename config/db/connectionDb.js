import "dotenv/config";
import pg from "pg"; /* dotenv se utiliza para cargar las variables de entorno desde un archivo .env */

//lo que hace new, es crear una instancia de objeto de Pool, entonces que hace Pool es para especificar la config para establecer la conexion a la base de datos, entonces por eso hacemos el new para que Pool pueda ser un objeto y asi agrupar todo.
//lo mismo que arriba pero de chat jpt:  "El uso de new crea una instancia de un objeto de Pool, que permite configurar la conexión a la base de datos. Pool es una clase que encapsula la lógica para administrar conexiones a la base de datos PostgreSQL utilizando un pool de conexiones. Al utilizar new, estamos creando un objeto que agrupa todas estas configuraciones y funcionalidades proporcionadas por la clase Pool."
const pool = new pg.Pool({
  /* En JavaScript, new pg.Pool(...) crea una nueva instancia de un objeto que es una instancia de la clase Pool proporcionada por el módulo pg. Esta clase Pool es una clase proporcionada por el módulo pg que encapsula la lógica para administrar conexiones a la base de datos PostgreSQL utilizando el pool de conexiones. Entonces, en tu caso, new pg.Pool(...) es seguido de la creación de una instancia de la clase Pool */
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true /* es una opción que indica que el proceso Node.js debe salir automáticamente cuando el pool de conexiones esté inactivo. Esto es útil en entornos como las aplicaciones de línea de comandos donde se espera que el proceso termine cuando no hay más tareas que realizar. */,
});

export default pool;

/* try {
    await pool.query("SELECT NOW()"); //SELECT NOW() ES PARA DEJAR REGISTRADO A QUE HORA SE REALIZO LA CONECCION CON LA DATABASE
    console.log("Database connected"); // Y BUENO ESTO ES PARA VER QUE LA DATABASE ESTE CONECTADA
} catch (error) {
    console.error("Error connecting to database:", error);
} */

/* En resumen, este código establece una conexión a la base de datos PostgreSQL utilizando las credenciales proporcionadas a través de variables de entorno, configura un pool de conexiones y verifica la conexión realizando una consulta de prueba. Además, garantiza que el proceso Node.js se cierre automáticamente cuando no se utilicen las conexiones del pool. */
