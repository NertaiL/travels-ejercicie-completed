import  express  from "express";
import { loginUser } from "../../src/controllers/loginController.js";
import { validateParamsLogin } from "../../middlewares/validateParamsLogin.js";

const router = express.Router()


router.post("/auth_user",validateParamsLogin, loginUser)//ESTA RUTA NO PUEDE IR POTEGIDA CON JSWONWEBTOKEN OSINO JAMAS VAMOS A PODER AUTENTICARNOS
/* router.all("*", notFound); */
export default router;