const morgan = require('morgan');
const express = require('express');
const app = express();
// Routing
const pokemon = require('./routes/pokemon');

/* ========================================
Middlewares
========================================= */
app.use(morgan('dev')); // 'dev' Para que sirva solo en desarrollo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================================
GET - Obtener recursos
POST - Almacenar/Crear recursos
PATCH - Modificar una parte de un recurso
PUT - Modificar un recurso
DELETE - Borrar un recurso
========================================= */

/* ========================================
Pagina Inicial
========================================= */
app.get('/', (req, res, next) => {
  return res.status(200).send('Bienvenido al pokedex');
});

app.use('/pokemon', pokemon);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
