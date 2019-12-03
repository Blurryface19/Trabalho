const conexao = require('./conexao')

var anime = conexao.Schema({
    titulo:{
        type:String
    },
    data:{
        type:Date
    },
    sinopse:{
        type:String
    },
    episodios:{
        type:Number
    },
    foto:{
        type:String
    },
    genero:{
        type:conexao.Schema.Types.ObjectId,
        ref: "genero"
    },
    obra:{
        type:conexao.Schema.Types.ObjectId,
        ref: "obra"
    },
    diretores:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "diretor"
    }]
})

module.exports = conexao.model("anime",anime)