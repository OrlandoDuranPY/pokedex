const express = require('express');
const app = express();
// Importar la base de datos 'pokedex.json'
const { pokemon } = require('./pokedex.json');

app.get('/', (req, res, next) => {
  res.status(200);
  res.send('Bienvenido al pokedex');
});

/* ========================================
Mostrar pokemon por numero
========================================= */
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
  // ID = el parametro recibido - 1 (tomando en cuenta la posicion del objeto)
  const id = req.params.id - 1;

  if (id >= 0 && id <= 150) {
    res.status(200);
    return res.send(pokemon[req.params.id - 1]);
  }
  res.status(404);
  res.send('Pokemon no encontrado');
});

/* ========================================
  Mostrar pokemon por nombre
========================================= */
app.get('/pokemon/:name', (req, res, next) => {
  const name = req.params.name;
  for (i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === name) {
      res.status(200);
      return res.send(pokemon[i]);
    }
  }

  res.status(404);
  res.send('Pokemon no encontrado');
});

/* ========================================
Mostrar todos los pokemon
========================================= */
app.get('/pokemon/all', (req, res, next) => {
  res.status(200);
  res.send(pokemon);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
