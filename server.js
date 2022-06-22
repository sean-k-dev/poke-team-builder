const express = require("express")
const MongoClient = require("mongodb").MongoClient
const app = express()
const PORT = 8000

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "ishi_FS_Crud"

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Successfully connected to ${dbName}`)
        db = client.db(dbName)
        const infoCollection = db.collection("spoon")
        app.post('/quotes', (req, res) => {
            infoCollection.insertOne(req.body)
              .then(result => {
                console.log(result)
              })
              .catch(error => console.error(error))
          })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/stats', (req, res) => {
    console.log("Stat update successfully sent to the database.")
  })