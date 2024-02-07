//validando los parametros de user , que si osi tiene que llevar nombre,apellido,email opassword que estamos pidiendo de lo contrario
//no se cumplira el flujo y no entrara al controller de users , ahora hacerlo con express validator

export const validateParamsUsers = (req,res,next) =>{
        const {user} = req.body
        if(!user.nombre || !user.apellido || !user.email || !user.password){
            return res.status(400).json({error: `Le falta los datos de nombre o apellido o email o password`})
        }
        next()
   
}
