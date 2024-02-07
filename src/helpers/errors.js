const ERRORS = [
    { code: "23502" , status: 400, message: "El campo destino o presupuesto no puede estar vacio"},
  { code: "22P02" , status: 400, message: "el tipo de dato no corresponde, bad request"},
  { code : "2201W" , status : 400, message : "El parámetro /limit/ debe ser un número entero positivo."},
  { code : "42601" , status : 400, message : "Error de sintaxis"},
  { code: `42P01` , status: 500, message: "Error in conneciton with data base"},
  { code: "auth_01", status: 400, message: "el usuario no existe" },
  { code: "auth_02", status: 400, message: "contraseña invalida" },
  { code: "auth_03", status: 401, message: "el token debe estar presente" },
  { code: "auth_04", status: 401, message: "el token no es valido" },
  { code: "22001", status: 400, message: "el valor supera el tipo de character permitido"}
  ];
  

export default ERRORS

