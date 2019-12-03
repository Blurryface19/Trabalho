var express = require('express')
var route = express.Router()
var obraCtr = require('../control/obraCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',obraCtr.getobras, obraCtr.listar)

//rota para listar todos
route.get('/', obraCtr.listar)

//rota para listar por filtro
route.post('/', obraCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', obraCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), obraCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', obraCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), obraCtr.edita)

//rota para deletar
route.get('/del/:id', obraCtr.deleta)

module.exports = route;