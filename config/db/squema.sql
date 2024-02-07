CREATE TABLE viajes (
  id SERIAL, 
  destino VARCHAR(50) NOT NULL, 
  presupuesto INT NOT NULL
);

CREATE TABLE equipamiento (
  id SERIAL, 
  nombre VARCHAR(50)
  );

  CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

/* es para saber a que hora y fecha se realizo un insert into osea se creo un registro */
/* es para saber a que hora y fecha se actualizo el registro */

-- ************** agrego trigger para la la columna update_at para mantener cuando se actualizo por ulitma vez el registro **************
                /* update_nombredelacolumna_nombredelatabla */
CREATE FUNCTION update_updated_at_usuarios()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE
    ON
        usuarios
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_usuarios();



/* si la table ya fue agregada seria este el paso */

ALTER TABLE viajes ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE viajes ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();


CREATE FUNCTION update_updated_at_viajes()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE
    ON
        viajes
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_viajes();