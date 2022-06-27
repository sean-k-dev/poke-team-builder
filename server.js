const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const PORT = 8000
require("dotenv").config()


let db,
    uri = process.env.ATLAS_URI
    dbName = "poke-team-builder"

MongoClient.connect(uri, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Successfully connected to the Pokémon Team Builder Database`)
        db = client.db(dbName)    
})

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req, res) => {
    db.collection("poke").find().toArray()
    .then(result => {
        console.log(result)
        res.render("index.ejs", {poke: result})
      })
    .catch(error => console.error(error))
})

app.post("/stats", (req, res) => {
    db.collection("poke").insertOne(req.body)
    .then(result => {
        console.log("Update successfully sent to the database.")
        console.log(req.body)
        console.log(result)
        res.redirect("/")
    })
    .catch(error => console.error(error))
})

app.put("/favourite", (req, res) => {
    db.collection("poke").updateOne(req.body,{
        $set: {
            favourite: req.body.favourite = true
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log(`Set ${req.body.name} as a favourite.`)
        response.json("Added to favourites")
    })
    .catch(error => console.error(error))
})

app.delete("/poke", (req, res) => {
    db.collection("poke").deleteOne({name: req.body.name})
    .then(result => {
        res.json(`Removed Pokémon from the team`)
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})
