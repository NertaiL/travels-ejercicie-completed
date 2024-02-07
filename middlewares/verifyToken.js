import { findError } from "../src/utils/utils.js";
import jwt from "jsonwebtoken";

//En mi caso dejamos la ruta get , protegida, entonces para leer todo los travels tenemos que hacer esto, verificar el token , yaque en la ruta get tenemos que pasarle el token que nos dio cuando iniciamos sesion
export const verifyTokenToAuthorize = async (req, res, next) => {
  try {
    validateHeaders(req, res);//aqui estamos llamando la funcion que tenemos abajo y en la funcion le decimos si no tiene autorizacion que nos de un error que nose encuentra el token, si esta presente el token sigue ala sgt
    console.log(req.header("Authorization")); //llega asi Bearer sda21ijsaokñjwue213241p2oonuryn321cpoopi39cisc3ci23 
    const token = req.header("Authorization").split(" ")[1];//aqui saco authorization del req.header y le aplico un split con un espacio y le asigno el 1, esto es para posicionarnos donde va el token y tambien sacamos el bearer
    //y quedaria algo asi token sda21ijsaokñjwue213241p2oonuryn321cpoopi39cisc3ci23 , entonces ya tenemos el token solo, sin el Bearer
    const tokenData = await validateToken(token); //aca le paso el token a la funcion validateToken, despues como retornamos la decodificacion del token queda guardado en tokenData
    req.user = tokenData; // y aca la paso al req.user el token decodificado y dependiendo a cual get , post ,put etc la dejamos conseguridad ahi la va a retornar en el controllador de dicha consulta y dara la autorizacion, en este caso aparecera en get porque en la ruta get tenemos el middlewares isLogin
    next();// aca pasa al siguiente paso osea al controllador si esta todo bien , osea next le da el paso para que siga su flujo la ruta que este protegida osea le da el paso para el controladores
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const validateToken = async (token) => {//aca llega el token  y aplicamos el jwt.verify le pasamos el token parametrizado y la firma que tenemos guardada en nuestro .env
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // y retorno el token decodificado
  } catch (err) {
    throw createError("auth_04", "Token no válido");
  }
};

const validateHeaders = (req) => { //le pasamos el req
  if (!req.header("Authorization")) {//si no tiene la authorization entonces 
    throw createError("auth_03", "token no encontrado");//le tiramos un error que el token no ha sido encontrado
  }
};

const createError = (code, message) => { //aqui cree una funcion de errores para poder ocupar el codigo auth_03 etc.
  const error = new Error(message);
  error.code = code;
  return error;
};

