var obra = require('../model/obra')


//middleware para buscar obras
function getObras(req, res, next) {
    obra.find({}).lean().exec(function (err, docs) {
        req.obras = docs
        next()
    })
}

function listar(req, res) {
    obra.find({}).lean().exec(function (err, docs) {
        res.render('obra/list.ejs', { "Obras": docs })
    })
}

function filtrar(req, res) {
    obra.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('obra/list.ejs', { "Obras": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("obra/add.ejs")
}

function adiciona(req, res) {
    var novoObra = new obra({
        nome: req.body.nome,
        volumes: req.body.volumes,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoObra.save(function (err) {
        if (err) {
            obra.find({}).lean().exec(function (err, docs) {
                res.render('obra/list.ejs', { msg: "Problema ao salvar!", Obras: docs })
            })
        } else {
            obra.find({}).lean().exec(function (err, docs) {
                res.render('obra/list.ejs', { msg: "Adicionado com sucesso!", Obras: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    obra.findById(req.params.id, function (err, obra) {
        res.render('obra/edit.ejs', { 'obra': obra });
    })
}

function edita(req, res) {
    obra.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            volumes: req.body.volumes,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                obra.find({}).lean().exec(function (err, docs) {
                    res.render('obra/list.ejs', { msg: "Problema ao editar!", Obras: docs })
                })
            } else {
                obra.find({}).lean().exec(function (err, docs) {
                    res.render('obra/list.ejs', { msg: "Editado com sucesso!", Obras: docs })
                })
            }
        })
}

function deleta(req, res) {
    obra.findByIdAndDelete(req.params.id, function () {
        obra.find({}).lean().exec(function (err, docs) {
            res.render('obra/list.ejs', { msg: "Removido com sucesso!", Obras: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getObras
}