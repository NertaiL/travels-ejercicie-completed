//filters en resumen armamos la consulta de sql y retornamos la consulta son sus valores agregados

const createQuery = (entity, filters) => { //entity es la tabla y filters vendria siendo lo que le pasamos por body en thunderclient, ejemplo destino,presupuesto
    // **********esto lo podriamos llevar a un metodo ?? para que todas las tablas lo usen, podriamos paginarlo??  ******
  // Inicializar la consulta base
  const table = entity.toLowerCase(); //para pasarlo a minuscula, por si escribo mal la tabla, mejor se pasa el nombre a minuscula
  let query = `SELECT * FROM ${table}  WHERE 1 = 1`;

  // La expresión 1 = 1 es simplemente una condición que siempre es verdadera. Se utiliza comúnmente 
  // como truco en la construcción de consultas SQL dinámicas para simplificar la lógica.

  // Cuando estás construyendo condiciones dinámicamente y quieres agregar condiciones adicionales con el 
  // operador AND, necesitas asegurarte de que la primera condición no genere un error de sintaxis. 
  // Al agregar 1 = 1 como la primera condición, la consulta siempre es verdadera, por lo que no afecta el 
  // resultado final de la consulta, pero permite agregar condiciones adicionales sin preocuparse si es la 
  // primera condición o no.

  // Obtener las claves y valores de filters                                                   key         value     key           value
  const filterEntries = Object.entries(filters); //object.entries me arma un array algo asi [['destino', 'chile'],['presupuesto', 29990]] osea su key y su value, key = a propiedad o columna
  const values = []; //creo este array vacio para agregar los valores y evitar el sql injection
  // Iterar sobre las claves y valores de filter
  for (const [key, value] of filterEntries) { //por cada key y valor que agregue el va a ir concatenando la consulta de let query con and, osea si yo en mi thunder client le paso por body destino y presupuesto la consullta quedaria asi ELECT * FROM ${table}  WHERE 1 = 1 and destino = $1 and presupuesto = $2
    if(key === "presupuesto_max"){
      query += ` AND presupuesto <= $${values.length + 1}`; 
    }else if(key === "presupuesto_min"){
      query += ` AND presupuesto >= $${values.length + 1}`;
    }else {query += ` AND ${key} = $${values.length + 1}`
      }; //values.length es + $1+$2+$3 etcc esto es para concatenar query por eso es let porque va a cambiar, esto se llama auto incrementar
    values.push(value); //aqui lo pusheo a values, para asi evitar el SQLinjection
  }
console.log(query,values);
  return { query, values };
}


export default createQuery

