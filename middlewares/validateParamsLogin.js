//validando los parametros de login , que si osi tiene que llevar el email o el password que estamos pidiendo de lo contrario
//no se cumplira el flujo y no entrara al controller de login, ahora hacerlo con express validator 
export const validateParamsLogin = (req,res,next) => {
    const {user} = req.body
    if(!user.email || !user.password){ 
      return  res.status(400).json({error: "Falta email o password"})
    }
    next()
}