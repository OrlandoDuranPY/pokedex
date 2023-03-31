const express = require('express');
const pokemon = express.Router();
// Importar la base de datos 'pokedex.json'
const pkmDB = require('../pokedex.json').pokemon;

/* ========================================
Nombre de las variables
========================================= */
/**
 * pokemon : express.Router
 * pkmn : Arreglo que almacena los datos del pokemon(nombre) que se busca por URL
 * pkmDB : pokedex.json (Base de datos)
 */

/* ========================================
  Mostrar todos los pokemon
  ========================================= */
pokemon.post('/', (req, res, next) => {
  return res.status(200).send(req.body);
});

pokemon.get('/', (req, res, next) => {
    console.log(pkmDB);
  // Retorna todo el objeto pokemon
  return res.status(200).send(pkmDB);
});

/* ========================================
Mostrar pokemon por numero
========================================= */
pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
  // ID = el parametro recibido - 1 (tomando en cuenta la posicion del objeto)
  const id = req.params.id - 1;

  /** Si el id se encuentra entre la posicion 0 (que es el id 1 del pokemon)
   * y 150 (que es el id 151 del pokemon), entonces retorna el pokemon que
   * solicitamos, caso contrario retorna el error 404
   */
  id >= 0 && id <= 150
    ? res.status(200).send(pkmDB[req.params.id - 1])
    : res.status(404).send('Pokemon no encontrado');
});

/* ========================================
    Mostrar pokemon por nombre
  ========================================= */
pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
  const name = req.params.name;

  /** Definimos un arreglo "pkmn" que va a almacenar todos los
   * pokemon que tengan el nombre que solicitamos por la URL,
   * el if retorna el/los pokemon que cumplan la condicion
   */
  const pkmn = pkmDB.filter((p) => {
    return p.name.toUpperCase() === name.toUpperCase() && p;
  });

  /** Comprobamos que el arreglo pkmn tenga al menos un elemento
   * en el arreglo, si es asi, entonces retornamos el contenido
   * de lo contrario retornamos un status 404
   */
  pkmn.length > 0
    ? res.status(200).send(pkmn)
    : res.status(404).send('Pokemon no encontrado');
});

module.exports = pokemon;
