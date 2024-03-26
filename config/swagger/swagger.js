import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", //esta es la version de
    info: {
      title: "Plan de viajes API",
      version: "1.0.0",
      description: "API para el manejo de viajes y usuarios",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1", //aqui podriamos tener mas versiones
      },
    ],
  },
  apis: ["config/routes/*.js"], //aqui especificamos donde va a estar la documentacion, para que swagger la pueda leer, en este caso le decimos en carpeta config luego routes y le decimos que este a tento a todos los archivos .js
};//como tenemos que cambiar la documentacion que tenemos en las rutas a docs, la direccion del archivo seria config/routes/docs/*.json o yml y para poder hacerlo como por el lado tenemos que hacerlo con yml o json

const specs = swaggerJsdoc(options); //aqui llamo a la libreria de swagger.jsdoc y le pasamos las options que creamos

export default (app) => {
  app.use(
    "/api/v1/docs", // url donde estaran disponibles los docs
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true, //es para generar la barrita de busqueda, se puede sacar
      customCssUrl:
        "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css", //esta son los temas de la pagina , como queremos que se vea
    })
  );
};
//aqui ahi mas temas, las cuales podemos ir probando y colocamos el que nos guste.
// theme-flattop.css;
// theme-monokai.css
// theme-material.css
// theme-muted.css
// theme-outline.css
