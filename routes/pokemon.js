const express = require('express');
const pokemon = express.Router();
// Importar la base de datos
const db = require('../config/database');

/* ========================================
Nombre de las variables
========================================= */
/**
 * pokemon : express.Router
 * pkmn : Arreglo que almacena los datos del pokemon(nombre) que se busca por URL
 * pkmDB : pokedex.json (Base de datos)
 */

/* ========================================
  Insertar un pokemon
  ========================================= */
pokemon.post('/', async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  // Verificar que vengan todos los datos
  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query =
      'INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)';
    query += ` VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query);
    console.log(rows);

    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: 'Pokemon insertado correctamente' });
    }
    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }
  return res.status(500).json({ code: 500, message: 'Campos incompletos' });
});

/* ========================================
Borrar un pokemon mediante su id
========================================= */
pokemon.delete('/:id([0-9]{1,3})', async (req, res, next) => {
  const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
  const rows = await db.query(query);
  if (rows.affectedRows === 1) {
    return res
      .status(200)
      .json({ code: 200, message: 'Pokemon borrado correctamente' });
  }

  return res.status(404).json({ code: 404, message: 'Pokemon no encontrado' });
});

/* ========================================
Modificar un pokemon completamente
========================================= */
pokemon.put('/:id([0-9]{1,3})', async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
    query += `pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;

    const rows = await db.query(query);
    console.log(rows);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: 'Pokemon actualizado correctamente' });
    }
    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }
});

/* ========================================
Modificar un pokemon parcialmente
========================================= */
pokemon.patch('/:id([0-9]{1,3})', async (req, res, next) => {

  if(req.body.pok_name){

  
    let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`

    const rows = await db.query(query);
    console.log(rows);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: 'Pokemon actualizado correctamente' });
    }

    return res.status(500).json({code: 500, message: 'Ocurrió un error'});
  }

  return res.status(500).json({code: 500, message: 'Campos incompletos'});
});

/* ========================================
Mostrar todos los pokemon
========================================= */
pokemon.get('/', async (req, res, next) => {
  // Retorna todo el objeto pokemon
  const pkmn = await db.query('SELECT * FROM pokemon');
  return res.status(200).json({ code: 200, message: pkmn });
});

/* ========================================
Mostrar pokemon por numero
========================================= */
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
  // ID = el parametro recibido - 1 (tomando en cuenta la posicion del objeto)
  const id = req.params.id - 1;
  /** Si el id se encuentra entre la posicion 0 (que es el id 1 del pokemon)
   * y 150 (que es el id 151 del pokemon), entonces retorna el pokemon que
   * solicitamos, caso contrario retorna el error 404
   */
  if (id >= 1 && id <= 722) {
    const pkmn = await db.query(
      'SELECT * FROM pokemon WHERE pok_id=' + id + ';'
    );
    return res.status(200).json({ code: 200, message: pkmn });
  }

  return res.status(400).send({ code: 404, message: 'Pokemon no encontrado' });
});

/* ========================================
    Mostrar pokemon por nombre
  ========================================= */
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
  const name = req.params.name;

  /** Definimos un arreglo "pkmn" que va a almacenar todos los
   * pokemon que tengan el nombre que solicitamos por la URL,
   * el if retorna el/los pokemon que cumplan la condicion
   */
  //   const pkmn = pkmDB.filter((p) => {
  //     return p.name.toUpperCase() === name.toUpperCase() && p;
  //   });
  const pkmn = await db.query(
    'SELECT * FROM pokemon WHERE pok_name=' + name + ';'
  );

  /** Comprobamos que el arreglo pkmn tenga al menos un elemento
   * en el arreglo, si es asi, entonces retornamos el contenido
   * de lo contrario retornamos un status 404
   */
  pkmn.length > 0
    ? res.status(200).json({ code: 200, message: pkmn })
    : res.status(400).send({ code: 404, message: 'Pokemon no encontrado' });
});

module.exports = pokemon;
