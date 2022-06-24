const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const PORT = 8000

require('dotenv').config()
const MongoClient = require("mongodb").MongoClient

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


const uri = process.env.ATLAS_URI


MongoClient.connect(uri, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Successfully connected to the Pokémon Team Builder Database`)
        const db = client.db("poke_team_builder")
        const infoCollection = db.collection("poke")
        app.post('/stats', (req, res) => {
            infoCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
              })
              .catch(error => console.error(error))
          })
    })
    .catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/stats', (req, res) => {
    console.log("Update successfully sent to the database.")
    console.log(req.body)
  })
