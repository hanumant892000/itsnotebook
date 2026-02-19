const express = require('express')
const app = express();
const connectToDB = require('./database')
const cors = require('cors')
// const dotenv = require('dotenv')
// dotenv.config()

require('dotenv').config()

const PORT = process.env.PORT;

// console.log(process.env)

connectToDB()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome to MyNoteBook App")
})

app.use("/api/v3.2/auth", require('./router/auth.router'))

app.use("/api/v3.2/note", require('./router/note.router'))

app.use("/api/v3.2/contact", require('./router/contact.router'))

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})