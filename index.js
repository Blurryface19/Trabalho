const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var generoRoute = require('./routes/generoRoute')
var diretorRoute = require('./routes/diretorRoute')
var obraRoute = require('./routes/obraRoute')
var animeRoute = require('./routes/animeRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/genero',generoRoute)
app.use('/diretor',diretorRoute)
app.use('/obra',obraRoute)
app.use('/anime',animeRoute)