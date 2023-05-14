// Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
// Routing
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
// Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

/* ========================================
Middlewares
========================================= */
app.use(cors);
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
app.get('/', index);

app.use('/user', user);
app.use(auth);
app.use('/pokemon', pokemon);

// Middleware para error 404
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
