const express = require('express');
const app = express();
// Importar la base de datos 'pokedex.json'
const { pokemon } = require('./pokedex.json');

/* ========================================
GET - Obtener recursos
POST - Almacenar/Crear recursos
PATCH - Modificar una parte de un recurso
PUT - Modificar un recurso
DELETE - Borrar un recurso
========================================= */

app.get('/', (req, res, next) => {
  return res.status(200).send('Bienvenido al pokedex');
});

/* ========================================
Mostrar pokemon por numero
========================================= */
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
  // ID = el parametro recibido - 1 (tomando en cuenta la posicion del objeto)
  const id = req.params.id - 1;

  id >= 0 && id <= 150
    ? res.status(200).send(pokemon[req.params.id - 1])
    : res.status(404).send('Pokemon no encontrado');
});

/* ========================================
  Mostrar pokemon por nombre
========================================= */
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
  const name = req.params.name;

  /** Definimos un arreglo "pk" que va a almacenar todos los
   * pokemon que tengan el nombre que solicitamos por la URL,
   * el if retorna el/los pokemon que cumplan la condicion
   */
  const pk = pokemon.filter((pkm) => {
    return pkm.name.toUpperCase() === name.toUpperCase() && pkm;
  });

  /** Comprobamos que el arreglo pk tenga al menos un elemento
   * en el arreglo, si es asi, entonces retornamos el contenido
   * de lo contrario retornamos un status 404
   */
  pk.length > 0
    ? res.status(200).send(pk)
    : res.status(404).send('Pokemon no encontrado');
});

/* ========================================
Mostrar todos los pokemon
========================================= */
app.get('/pokemon', (req, res, next) => {
  console.log(pokemon);
  return res.status(200).send(pokemon);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
