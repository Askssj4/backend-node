const express=require("express");
const api = express.Router();

//Controladores.
const usuario_controller = require("../controllers/usuario_controller");
//middleware de rutas
const authMiddleware = require('../middlewares/authMiddleware');


api.post("/login", usuario_controller._login)

module.exports= api;


