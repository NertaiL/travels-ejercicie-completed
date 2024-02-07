import express from "express";
import {
  getAllTravels,
  getTravelsById,
  createTravels,
  updateTravels,
  removeTravels,
  getTravelsLimit,
  getOrderByLimitTravels,
  getPaginatorTravels,
  filterTravels,
  getTravelsWithHateoas,
  filterTravelss,
} from "../../src/controllers/travelsController.js";
/* import { Router } from "express"; 2da forma de hacerlo
const router = Router() */
import { verifyTokenToAuthorize } from "../../middlewares/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: API para la gestión de viajes
 */

/**
 * @swagger
 * components:   //aqui defino un componente
 *   securitySchemes: //si mi ruta necesitara un token
 *     BearerAuth:  //de tipo bearer
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Travels: //aqui dijo que travels es de tipo objeto
 *       type: object
 *       required:  //esto son las columnas/atributos
 *         - destino
 *         - presupuesto
 *       properties: //aca tengo mis propiedades y los tipos de como se crearon en la base de datos
 *         id:
 *           type: integer
 *           description: The auto-generated id of the users
 *         destino:
 *           type: string
 *           description: The travel's destination
 *         presupuesto:
 *           type: integer
 *           description: The travel's budget
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *       example:   //este es un ejemplo que se mostrara en el schemas
 *         destino: paris
 *         presupuesto: 1000
 */

/**
 * @swagger
 * /travels:
 *   get: //aca hacemos el metodo get en ese caso
 *     security:  //aca como esta protegida la ruta get ocupamos el security y le pasamos el bearer
 *       - BearerAuth: [] //aca nos va a desplegar una ventana para autenticarnos
 *     summary: Obtener todos los viajes //este es un resumen de lo que devuelve ese endpoint, osea saldria al lado de get
 *     tags: [Travels] //aca le decimos que se valla al grupo Travels, por eso es importante crear los tags que hicimos mas arriba
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema: //el schema es de tipo object, osea lo que esta en el payload, es lo que esta dentro de travels
 *               type: object
 *               properties:
 *                 travels: //en este caso como nos devuelve un array de viajes, le decimos que es de tipo array
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Travels' //aqui estoy reutilizando lo que tenemos en el de mas arriba
 *       '400':
 *         description: Error al obtener los viajes
 */

router.get("/travels", verifyTokenToAuthorize, getAllTravels);
router.post("/travels", createTravels);
router.put("/travels/:id", updateTravels);
router.delete("/travels/:id", removeTravels);

router.get("/travels/:id", getTravelsById);
router.get("/travels_with_limit", getTravelsLimit);
router.get("/travels_order_with_limit", getOrderByLimitTravels);
router.get("/travels_paginador", getPaginatorTravels);
router.get("/travels_filter", filterTravels);
router.get("/travels_with_hateoas", getTravelsWithHateoas);
router.get("/travels/filters/paginator", filterTravelss);

/* router.all("*", notFound); */ //esto siempre tiene que ir alfinal de las rutas

export default router;
