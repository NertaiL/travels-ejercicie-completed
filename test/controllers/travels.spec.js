import request from "supertest";//para poder pasarle el servidor
import  app  from "../../server.js";
import {faker} from "@faker-js/faker";  
import { generateToken } from "../utils/login.js";
import { createTravel } from "../../src/models/travelModel.js";
//un punto a parte, jest tiene una funcionalidad a parte ,que es el coverage lo que hace es hacer un informe en html del testing
//con el send envio parametros y con el set me va a setear lo que yo necesito
//ver la pagina jestjs en usando comparadores y ahi nos saldran los matches , como toBeNull , toBe etc..
describe("travels controller", () => {
  describe("GET /api/v1/travels with valid params", () => {
    //aqui le damos el nombre basicamente de lo que se va a realizar, en este caso se va a validar la ruta get con valid params
    const token = generateToken(); //como esta ruta esta protegida , creamos una carpeta utils en test y hacemos una funcion que me genere un token con faker y que seea valido para poder entrar
    it("should return all travels", async () => {
      const response = await request(app) //aca ocupamos la funcion request de supertest y le pasamos app, para esto tenemos que irnos a server y export default app,esto se hace porque nuestro switch de testing tiene que levantar el servidor para hacer las pruebas
        .get("/api/v1/travels")//aca le pasamos la ruta para ir hacer la consulta
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200); //que es statusCode ? el tobe que es?, al hacer un request su status code, tiene que ser igual a 200, en este caso como solo es un get all no le pasamos parametro
    });
    //aaca evaluo si tiene las propiedades
    it("the response with travels key",async () => {
        const response = await request(app).get("/api/v1/travels").set("Authorization",`Bearer ${token}`)
        expect(response.body).toHaveProperty("travels")
    })
     //aca evaluo si es una instancia de un array
    it("is instance of array", async()=>{ //es una instancia de un array, recordemos que los it serian una descripcion de lo que esta testeando
        const response = await request(app).get("/api/v1/travels").set("Authorization", `Bearer ${token}`)
        const {travels} = response.body //en response.body va a llegar la respuesta, destructuramos travels
        expect(travels).toBeInstanceOf(Array);//toBeInstanceOf puede ser array o string o object o boolean. aca le digo espero que travels sea una instancia de un array
    })
  });

  //este es un testing de invalid
  describe("GET /api/v1/travels with invalid params", ()=>{
    it("return 401 with invalid token", async () => {
      const token = faker.string.alphanumeric() //aqui estamos generando un token random , entonces como no tiene el secreto ni el email, entonces va a recharzlo, el mas importante esque no tiene el secreto entonces va a rechazarlo
      const response = await request(app).get("/api/v1/travels").set("Authorization",`Bearer ${token}`)
      expect(response.statusCode).toBe(401)
    })
    //aqui estamos generando un token, pero un token invalido
    it("return message with invalid token", async ()=>{
      const token = faker.string.alphanumeric() //o puede ser const token = "" o const token = null
      const response = await request(app).get("/api/v1/travels").set("Authorization",`Bearer ${token}`)
      expect(response.body.error).toBe("el token no es valido") //tambien puede ser asi expect(response.statusCode).toBe(401)
    })
    //por si quieren ingresar y mandan un token null = vacio nos dara el mismo error de arriba el token no es valido pero aca lo testeamos con el codigo
    it("return code of invalid token",async ()=>{ //Aqui se comporta como si le mandar un token pero vacio, por eso me manda el error de el token no es valido , y como tengo esto set("Authorization",`Bearer ${token}`) entonces ya simula el token pero un token vacio
      const token = null
      const response = await request(app).get("/api/v1/travels").set("Authorization",`Bearer ${token}`)
      expect(response.statusCode).toBe(401)
    })
    it("return message the token has to be present",async ()=>{
      const response = await request(app).get("/api/v1/travels")//aqui hago un get, pero sin Authorization",`Bearer ${token}, entonces por eso me dice el token debe estar presente
      expect(response.body.error).toBe("el token debe estar presente")
    })
  }) 
 //aqui no le estoy pasando ningun dato a presupuesto por eso puedo validar con errores
  describe("POST /api/v1/travels create travels with invalid params", ()=>{
    const payload = {
      travels:{
        destino: faker.location.country(), //aqui le mandamos correctamente el destino, pero en presupuesto no, porque si se loe envias faker.comerce.price() va a enviar un float entonces va a ser incorrecto, hay que mandarle el float { min: 100, max: 200, dec: 0 } yasi funcionaria, pero como en este caso queremos que se rompa aproposito lo mandamos sin el float
        presupuesto: faker.commerce.price(),//invalid type, no le estamos pasando nada de precio, { min: 100, max: 200, dec: 0 } si yo estoy guardando un float, tengo que buscar la categoria que me sirva con float
      },
    }
    //return status code en caso de error
    it("return 400 with invalid type price", async ()=>{
      const response = await request(app).post("/api/v1/travels").send(payload)
      expect(response.statusCode).toBe(400);
    })
    //return message en caso de error
    it("return message empty", async () =>{
      const response = await request(app).post("/api/v1/travels").send(payload)
      expect(response.body.error).toBe("el tipo de dato no corresponde, bad request")
    })
  })

  describe("PUT /api/v1/travels update travels with valid params", () =>{
    //hay librerias que gestionan esto como factory bot, que crea todo el beforeach como esta aqui, asi no lo hacemos a mano, pero el problema es que funciona con clases y las clases no la hemos visto aca en desafio latam, clases es full programacion orientado a objeto como clases de herencia mixsin, metodos de instancia, polivorfirmo tengo que aprender todo esto.
    let existingTravelId   //si creamos un registro de prueba solo le pasamos el id y quedaria asi (const existingTravelId = 6) y nos evitamos de hacer beforeEach
    beforeEach(async () =>{ //beforeEach es una propiedad de jest, lo ocupamos para poder crear un registro de prueba en nuestra base de dato o en vez de un beforeEach, podriamos crear directamente un viaje a la base de dato y asi no hacemos beforeach y solo pasamos el id del que creamos para prueba y tambien podriamos hacer esque al hacer npm run test y termine se elimine el registro de prueba asi nos queda limpia en nuestra base de dato,ahora lo recomenbale es tener una base de datos de test, asi no tenemos registros de prueba en nuestra base de datos de desarrollo
      const payload = { 
        travels: {
          destino: faker.location.country(),
          presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 })
        },
      }
      const travel = await createTravel(payload.travels)
      existingTravelId = travel.id}) //aqui guardamos el id, del viaje recien creado por beforeEach 
      const data = {
        travels:{
          destino: faker.location.country(),
          presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 })
        }
      }
      it("return 200", async () => {
        const response = await request(app).put(`/api/v1/travels/${existingTravelId}`).send(data) 
        expect(response.statusCode).toBe(200)
      })
      it("return the properties",async() =>{
        const response = await request(app).put(`/api/v1/travels/${existingTravelId}`).send(data)
        expect(response.body).toHaveProperty("travels_update")
      })
      it("return instance of object",async()=>{
        const response = await request(app).put(`/api/v1/travels/${existingTravelId}`).send(data)
        const {travels_update} = response.body
        expect(travels_update).toBeInstanceOf(Object)
      })
      it("return object with id eq existingTravelId", async()=>{
        const response = await request(app)
        .put(`/api/v1/travels/${existingTravelId}`)
        .send(data)
        const {travels_update} = response.body
        expect(travels_update.id).toEqual(existingTravelId)
      })
  })
 
});
