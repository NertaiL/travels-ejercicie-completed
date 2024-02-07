import  pool  from "../../config/db/connectionDb.js";
import  format  from "pg-format";
import createQuery from "../helpers/filters.js";

//get
export const getTravels = async () =>{
    const SQLquery = {text: "SELECT * FROM viajes;"}
    const response = await pool.query(SQLquery)
    return response.rows
}

//post
export const createTravel = async ({destino,presupuesto}) =>{
    const SQLquery = {text: "INSERT INTO viajes (destino,presupuesto) VALUES ($1,$2) RETURNING *",
                      values: [destino,presupuesto]}
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

//put
export const updateTravel = async (id,{destino,presupuesto}) =>{
    const SQLquery = {text: "UPDATE viajes SET destino = $2,  presupuesto = $3 WHERE id = $1 RETURNING *",
                      values: [id,destino,presupuesto]}
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

//delete
export const removeTravel = async (id) =>{
    const SQLquery = {text: "DELETE FROM viajes WHERE id = $1",
                      values: [id]}
    const response = await pool.query(SQLquery)
    return response.rowCount
}

//get travels by id
export const getTravel = async(id) => {
    const SQLquery = {text: "SELECT * FROM viajes WHERE id = $1",
                      values: [id]}
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

//get whit limit
export const limitTravel = async(limit = 10) =>{
    const SQLquery = {text: "SELECT * FROM viajes ORDER BY id DESC LIMIT $1",
                      values: [limit]
    }
    const response = await pool.query(SQLquery)
    return response.rows
}

//get order and limit with pg-format , aqui estamos paginando con pg-format
export const orderAndLimit = async(order_by = "id_ASC",limits = 10, page = 4) =>{
    const [attribute, direction] = order_by.split("_") //esto va a seprar el id ASC porque osino seria id_ASC y va a quedar en un array [id ASC]
    const offset = (page -1) * limits; //aqui el (page -1) es para que la pagina 1 sea la pagina 1 y no que la pagina 0 sera la pagina 1 
    const formattedQuery = format( //SE OCUPA LA LIBRERIA PG FORMAT PARA PODER SEPARAR EL id de asc
        "SELECT * FROM viajes ORDER BY %s %s LIMIT %s OFFSET %s",
        attribute, //seria el id
        direction, // seria el ASC o DESC depende cual queramos pasar por thunder
        limits,
        offset
    )
    console.log("attribute,direction,limits,offset");
    const response = await pool.query(formattedQuery)
    return response.rows
}

//get filters
export const travelsFilter = async (filters) => {
    const { query, values } = createQuery("viajes", filters); //a la funcion createQuery le pasamos por parametro la table que seria viajes y filters que seria las propiedades, columnas de travels ejemplo destino,presupuestpo, luego nos traemos ls query y su value de filters y lo destructuramos como lo vemos
    const response = await pool.query(query, values); //y bueno aqui hago la consulta a la base de dato
    return response.rows;
  };



