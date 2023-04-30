const express = require('express');
const user = express.Router();
// Importar la base de datos
const db = require('../config/database');

/* ========================================
Agregar un usuario nuevo
========================================= */
user.post('/', async (req, res, next) => {
  const { user_name, user_mail, user_password } = req.body;

  if (user_name && user_mail && user_password) {
    let query = 'INSERT INTO users (user_name, user_mail, user_password)';
    query += ` VALUES('${user_name}', '${user_mail}', '${user_password}');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: 'Usuario registrado correctamente' });
    }

    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }

  return res.status(400).json({ code: 400, message: 'Campos incompletos' });
});

user.get('/', async (req, res, next) => {
    const query = `SELECT * FROM users`;
    const rows = await db.query(query);

    return res.status(200).json({code:200, message: rows});
});

module.exports = user;
