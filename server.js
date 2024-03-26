import express  from "express";
import  cors  from "cors";
/* import  { logger }  from "logger-express"; */
import  travelRouter  from "./config/routes/travelRoutes.js"
import  userRouter  from "./config/routes/userRoutes.js";
import  loginRouter  from "./config/routes/loginRoutes.js";
import swagger from "./config/swagger/swagger.js";
/* import { notFound } from "./src/controllers/travelController.js"; */

const app = express()
const PORT = process.env.PORT || 3000

//middlewares
swagger(app)
app.use(express.json())
/* app.use(logger()) */
app.options('*', cors()) //para no tener problemas de cors con swagger
app.use("/api/v1",travelRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",loginRouter)
/* app.use("*", notFound) */

app.listen(PORT, () =>{
    console.log(`🔥 Server ON 🔥 en el puerto https://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
})

export default app;