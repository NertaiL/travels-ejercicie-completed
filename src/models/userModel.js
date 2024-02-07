import  pool  from "../../config/db/connectionDb.js";
import bcrypt from "bcryptjs";

//insert into para crear nuestro usuario
export const createUser = async ( {nombre, apellido, email, password} ) => {
    const hashedPassword = bcrypt.hashSync(password)//antes de guardar su password lo que hago es que yo encripto la contraseña, entonces en la base de datos nos aparecera la contraseña encriptada que seria puros numeros random
    const SQLquery = {
      text: "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [nombre, apellido, email, hashedPassword],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  };
  
  //search by gmail para poder generar la autenticacion y sera ocupada en el login Controller
 export const byEmail = async ({email}) => {
    const SQLquery = {
      text: "SELECT * FROM usuarios WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  }


  /* que chat gpt me explique bien este codigo sbre bcrypt.hashsync(password) me imagino que es para encriptar la constraseña  */