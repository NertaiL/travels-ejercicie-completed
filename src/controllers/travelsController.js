import { getTravels , getTravel, createTravel, updateTravel, removeTravel, limitTravel,orderAndLimit,travelsFilter} from "../models/travelModel.js";
import { findError }  from "../utils/utils.js"; // se coloca con {} porque la funcion viene con el export y no es default
import  pagination  from "../helpers/paginator.js"; //se coloca sin {} porque viene por export default
import prepareHateoas from "../helpers/hateoas.js";

//get
export const getAllTravels = async (req,res) => {
    console.log("req", req.user); //aca llegaria el token con el email , iat y su fecha de expiracion del token
    try {
        const travels = await getTravels()
        res.status(200).json({travels})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}
//get by id
export const getTravelsById = async (req,res) => {
    try {
        const {id} = req.params
        const travel_by_id = await getTravel(id)
        res.status(200).json({travelById : travel_by_id})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}
//post
export const createTravels = async (req,res) =>{
    try {
        const {travels} = req.body
        const new_post = await createTravel(travels) 
        res.status(201).json({new_post})
        console.log({post: new_post});
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}
//put
export const updateTravels = async (req,res) =>{
    try {
        const {id} = req.params
        const {travels} = req.body
        const travel_update = await updateTravel(id,travels)
        res.status(200).json({travels_update: travel_update})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

export const removeTravels = async (req,res) =>{
    try {
        const {id} = req.params
        const travel_remove = await removeTravel(id)
        if(travel_remove == 0){
            res.status(404).json({message: "No se ha podido eliminar el registro"})
            return
        }
        res.status(200).json({message: "Ha sido eliminado exitosamente"})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

export const getTravelsLimit = async (req,res) =>{
    try {
        const {limit} = req.query
        const travels = await limitTravel(limit)
        res.status(200).json({ travels: travels})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

//paginator with pg-format 
export const getOrderByLimitTravels = async (req,res) =>{
    try {
        const {order_by, limit , page} = req.query //VA A ORDENAR A LIMITAR Y A PAGINAR
        const travels = await orderAndLimit(order_by,limit,page)
        res.status(200).json({travels : travels})
    } catch (error) {
        console.log(error); //console.log(error.code); es lo mismo pero solo nos tiraria el codigo, asique es mejor ver error asi vemos que puede ser
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json(errorFound[0].message)
    }
}

//paginator good  este ocupa menos recurso ya que no ocupamos sql ni usamos order by y offset que ocupan muchos recursos, aqui nos traemos todos los viajes no necesitamos hacer un modelo apra este controllers.
export const getPaginatorTravels = async (req,res) =>{
    try {
        const {items,page} = req.query
        const travels = await getTravels()
        console.log(travels);
        const paginationData = pagination(travels,items,page)
        res.status(200).json({paginationData})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error : errorFound[0].message})
    }
}

//filter dinamic with paginator.js recomendado
export const filterTravels = async (req,res) =>{
    try {
        const {items,page,filters} = req.body
        const travels = await travelsFilter(filters) //filters es donde va estar destino , presupuesto etc
        const paginationData = pagination(travels,items,page)
        console.log(paginationData);
        res.status(200).json({paginationData})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error : errorFound[0].message})
    }
}

//hateoas with paginator pg-format, este ocupa muchos recursos por eso es mejor ocupar el paginator.js y no el paginador con pg-format
export const getTravelsWithHateoas = async (req, res) => {
    try {
      const { order_by, limit , page } = req.query;
      const paginatedTravels = await orderAndLimit(order_by, limit , page);
      const travelsWithHateoas = await prepareHateoas("travels", paginatedTravels);
      res.status(200).json({ travels: travelsWithHateoas });
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error : errorFound[0].message})
    }
  };

/* export const notFound = async (req,res) =>{
    res.status(404).json({error :"This request is not possible"})
} */

//filter and paginator by req.query 
export const filterTravelss = async (req,res) =>{
    try {
        /* const {items,page,filters} = req.body */
        const { presupuesto_max, presupuesto_min,destino,items,page} = req.query
        const filters = {presupuesto_min,presupuesto_max,destino}
        const travels = await travelsFilter(filters) 
        const paginationData = pagination(travels,items,page)
        console.log(pagination);
        res.status(200).json(paginationData)
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

