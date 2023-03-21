const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Bienvenido al servidor');
});

app.get('/:name', (req, res, next) => {
    const name = req.params.name;
    res.status(200);
    res.send(`Hola, ${name}`);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});