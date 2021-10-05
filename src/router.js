const express = require("express")
const router = express.Router()
const {creditHandler} = require("./routes/credit")
const {debitHandler} = require("./routes/debit")
const {infoHandler} = require("./routes/wallet-info")

//Middleware for parsing data
router.use(express.json());

router.get('/:id', infoHandler)

router.post('/:id/credit', creditHandler)

router.post('/:id/debit', debitHandler)

module.exports = router