'use strict'
// middleware encargado de la protección de rutas y verificación por token
const jwt = require('jwt-simple');
const moment = require('moment')
const config = require('../config')
const { DateTime } = require("luxon");

//Conexión a BD.
const {sequelize} = require('../models/index.js');
//importamos modelo para usuarios.
let init_models= require("../models/init-models");

var Entity= init_models(sequelize); // inicialización de los modelos.



const _isAuth=async(req, res, next)=>{
    console.log("EL MIDDLEWARE");
   

    const token = req.headers.authorization.split(' ')[1]; // esto es porque authorization incluye un texto llamado Bearer token, entonces nos quedamos con el elemento luego del espacio, eltoken.

    const payload = jwt.decode(token, config.SECRET_TOKEN);
    let now = DateTime.now();
    console.log("FECHA EXP: ", payload.exp);
    if(payload.exp <=now) // si la fecha de caducado es menor a la fecha actual.
    {
        return res.status(401).send({ message: 'El token ha expirado'});

    }
    next()
    
    
}



module.exports={
    _isAuth,
}