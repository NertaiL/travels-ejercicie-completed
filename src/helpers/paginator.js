//lo bueno de este paginador que podemos ocuparlos en cualquiera de nuestra funciones de consultas.
const pagination = (data, items, page ) => { //data recibe la respuesta de la base de datos y luego la pagina, vendria siendo travels, que seria todos los registros existentes
    // convierto los parámetros de la página y los elementos a números
  const pageInt = Number(page);
  const itemsInt = Number(items);

  // se calculan los índices de inicio y fin para la porción de datos paginada
  const startIndex = (pageInt - 1) * itemsInt; // esto es lo mismo que endIndex pero me calcula la porcion hacias atras
  const endIndex = pageInt * itemsInt; //aqui estamos diciendo ejemplo, si hay 4 paginas * 5 items = 20  osea que se reparten 5items por cada pagina hasta 4

  // guardo el resultado en un objeto
  const results = {};//esto es mutable

  // valido si hay una página siguiente y agrego la info
  if (endIndex < data.length) { //aca estamos diciendo que si la porcion es menor que la cantidad de elementos que tenemos en data, (data son todos nuestro registros)
    results.next = {// entonces si se cumple muestrame next : las pagina siguiente , con la cantidad de items, como results es mutable entonces puedo escribir cualquier cosa y añadirla
      page: pageInt + 1,
      items: itemsInt,
    };
  }

 // valido si hay una página anterior y agrego la info
  if (startIndex > 0) { //aca le digo si la porcion es menor a 0 entonces que me muestre la pagina anterior con la cantidad de items y el numero de pagina
    results.previous = {
      page: pageInt - 1,
      items: itemsInt,
    };
  }

   // agrego la porción paginada de los datos a los resultados
  results.results = data.slice(startIndex, endIndex); //como reuslts es mutable le puedo agregar cualquier cosa aqui estoy agregando results: tendra la data seria la pagina actual mas su inicio y su final
  return results;
};

export default pagination;

/* 
¡Exactamente! Has captado la idea correctamente. data representa todos los registros y data.slice(startIndex, endIndex) 
selecciona la porción de registros que corresponden a la página actual. 
Luego, los bloques if verifican si hay más registros antes y después de la página actual y, si es así,
 agregan información sobre las páginas anterior y siguiente en el objeto results. 
 
 slice sirve para extraer una porcion de un arreglo
 */