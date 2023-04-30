const morgan = require('morgan');
const express = require('express');
const app = express();
// Routing
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

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
  return res.status(200).json({code: 1, message: "Bienvenido al Pokedex"});
});

app.use('/pokemon', pokemon);
app.use('/user', user);

// Middleware para error 404
app.use( (req, res, next) => {
  return res.status(404).json({code: 404, message: "UR: no encotrada"});
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
