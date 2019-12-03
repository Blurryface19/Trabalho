var express = require('express')
var route = express.Router()
var animeCtr = require('../control/animeCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',animeCtr.getAnimes, animeCtr.listar)
route.get('/',animeCtr.getAnimes, animeCtr.listar)

//rota para listar por filtro
route.post('/', animeCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', animeCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), animeCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', animeCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), animeCtr.edita)

//rota para deletar
route.get('/del/:id', animeCtr.deleta)

module.exports = route;