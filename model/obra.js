const conexao = require('./conexao')

var obra = conexao.Schema({
    nome:{
        type:String
    },
    volumes:{
        type:Number
    },
    datafundacao:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("obra",obra)