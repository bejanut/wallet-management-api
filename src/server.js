const express = require("express")
const app = express()
const walletRouter = require("./router")

app.get('/', (req, res) => {
    console.log("Welcome to localHost")
    res.status(500).json({ message: "Error"})
})

app.use("/wallets", walletRouter)

app.listen(8080)

