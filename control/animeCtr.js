var anime = require('../model/anime')
var obra = require('../model/obra')
var genero = require('../model/genero')
var diretor = require('../model/diretor')

//middleware para buscar animes
function getAnimes(req, res, next) {
    anime.find({}).lean().exec(function (err, docs) {
        req.animes = docs
        next()
    })
}

function listar(req, res) {
    anime
        .find({})
        .populate('genero')
        .populate('obra')
        .populate('diretores')
        .lean()
        .exec(function (err, docs) {
            res.render('anime/list.ejs', { "Animes": docs })
        })
}

function filtrar(req, res) {
    anime
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('genero')
        .populate('obra')
        .populate('diretores')
        .lean()
        .exec(function (err, docs) {
            res.render('anime/list.ejs', { "Animes": docs })
        })
}

function abrirAdiciona(req, res) {
    obra
        .find({})
        .lean()
        .exec(function (e, obras) {
            diretor
                .find({})
                .lean()
                .exec(function (e, diretores) {
                    genero
                        .find({})
                        .lean()
                        .exec(function (e, generos) {
                            res.render("anime/add.ejs", { "Obras": obras, "Diretores": diretores, "Generos": generos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoAnime = new anime({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        genero: req.body.genero,
        obra: req.body.obra,
        diretores: req.body.diretores,
        episodios: req.body.episodios,
        data: req.body.data,
    })
    novoAnime.save(function (err) {
        if (err) {
            anime.find({}).populate('genero').populate('obra').populate('diretores').lean().exec(function (err, docs) {
                res.render('anime/list.ejs', { msg: "Problema ao salvar!", Animes: docs })
            })
        } else {
            anime.find({}).populate('genero').populate('obra').populate('diretores').lean().exec(function (err, docs) {
                res.render('anime/list.ejs', { msg: "Adicionado com sucesso!", Animes: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    obra.find({}).lean().exec(
        function (e, obras) {
            diretor.find({}).lean().exec(
                function (e, diretores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            anime.findOne({ _id: req.params.id }).populate('genero').populate('obra').populate('diretores').exec(
                                function (err, anime) {
                                    res.render('anime/edit.ejs', { 'anime': anime, "Obras": obras, "Diretores": diretores, "Generos": generos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    anime.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            genero: req.body.genero,
            obra: req.body.obra,
            diretores: req.body.diretores
        }, function (err) {
            if (err) {
                anime.find({}).populate('genero').populate('obra').populate('diretores').lean().exec(function (err, docs) {
                    res.render('anime/list.ejs', { msg: "Problema ao editar!", Animes: docs })
                })
            } else {
                anime.find({}).populate('genero').populate('obra').populate('diretores').lean().exec(function (err, docs) {
                    res.render('anime/list.ejs', { msg: "Editado com sucesso!", Animes: docs })
                })
            }
        })
}

function deleta(req, res) {
    anime.findByIdAndDelete(req.params.id, function () {
        anime.find({}).populate('genero').populate('obra').populate('diretores').lean().exec(function (err, docs) {
            res.render('anime/list.ejs', { msg: "Removido com sucesso!", Animes: docs })
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
    getAnimes
}