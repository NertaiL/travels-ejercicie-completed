import  express  from "express";
import { createNewUser } from "../../src/controllers/usersController.js";
import { validateParamsUsers } from "../../middlewares/validateParamsUsers.js";

const router = express.Router();

router.post("/users",validateParamsUsers ,createNewUser)
/* router.all("*", notFound); */

export default router

