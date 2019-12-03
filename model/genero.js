const conexao = require('./conexao')

var genero = conexao.Schema({
    nome:{
        type:String
    },
    animes:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"anime"
        }
    ]
})

module.exports = conexao.model("genero",genero)