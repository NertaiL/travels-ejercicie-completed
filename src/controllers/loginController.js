import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; //esta libreria la quiero, porque como el password lo encriptamos, ahora necesitamos desencriptarlo para poder compararlo
import { findError } from "../utils/utils.js"; //reutilizando el finderror donde tenemos todos los posibles errores que pueden pasar
import { byEmail } from "../models/userModel.js"; //importamos email que tenemos en el modelo del usuario.

export const loginUser = async (req, res) => {
  // si pasa la validacion del middlewares que creamos pasa al siguiente codigo
  const { user } = req.body;  //AQUI QUEDARIA LOGEADO LO QUE ESCRIBA EL USUARIO EN LA PAGINA QUE EN ESTE CASO SERIA EMAIL Y PASSWORD
  try {
    const findUser = await byEmail(user); //aqui me retorna el correo que busque en la base de datos
    if (!findUser) {
      // si el correo no coinciden con el que esta en la base de datos, entonces me retornar un error  auth_01 que dice no existe el registro y si existe paso al siguiente
      const errorFound = findError("auth_01");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    } else {
      const isPasswordValid = bcrypt.compareSync(
        //aqui le digo que me compare el password y si coinciden me devuelve un true y si no un false
        user.password, //esta vendria siendo la password que ingreso el cliente para iniciar sesion
        findUser.password //esta es la password que ingreso el cliente al momento de registrarse
      ); //entonnces como finduser.password esta encriptada, yaque la guardamos en la base de datos, por eso aqui ocupamos bcrypt para poder comparar la contraseña de textoplano de user.password con la cotraseña encriptada guardada en la base de dato que es la que el cleinte de registro
      if (!isPasswordValid) {
        const errorFound = findError("auth_02");
        return res
          .status(errorFound[0].status)
          .json({ error: errorFound[0].message });
      } else {
        /* entonces jwt.sign, basicamente es para asignar un token? en este caso un token para email? y el otro process.env.JWT etc es para firmar como autorizar ese token
        ChatGPT
        Sí, exactamente. jwt.sign es una función proporcionada por la biblioteca jsonwebtoken que se utiliza para firmar (o crear) tokens JWT. Aquí está la explicación desglosada:
        jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }):
        { email }: Es la información que se incluirá en el token. En este caso, solo estás incluyendo la propiedad email del objeto.
        process.env.JWT_SECRET: Es la clave secreta utilizada para firmar el token. Esta clave debe mantenerse segura y no debe compartirse públicamente.
        { expiresIn: "1h" }: Especifica la duración de validez del token. En este caso, el token será válido durante 1 hora después de ser emitido. */
        const { email, nombre, apellido } = findUser; //aqui podriamos  pasar solo email los otros 2 no lo ocupamos
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          //aqui le paso el process.env.JWT_SECRET que es el que tenemos en nuestro env
          expiresIn: "1h", //expires in "1h" quiere decir que el token creado durara solamente 1 hora y despues no va a servir, osea el usuario va a tener que autenticar nuevamente
        });
        res.status(200).json({
          //bueno aqui retorno un mensaje, codigo 200, con el token ,lo importante es retornar el token los otros 2 da lo mismo
          message: `Bienvenido, ${nombre} ${apellido} has iniciado sesion`,
          code: 200,
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


/* export const notFound = async (req,res) =>{
  res.status(404).json({error :"This request is not possible"})
} */