const domain = require("../domain/domain-model")
const pool = require("../database/pools/wallet-pool").value
const Repository = require("../database/postgres-repository")
const repository = new Repository(pool)
const dupCheck = require("./helpers/check-duplicate-transaction")
const inputValidator = require("./helpers/input-validator")

async function debitHandler (req, res) {
    const id = req.params.id

    //Validate body
    const validationErrors = inputValidator(req.body)

    if(validationErrors.length > 0) {
        res.status(400).json({ErrorMessage: validationErrors});
    } else {
        //Check for duplicate transactions
        if (await dupCheck.checkDuplicateTransaction(id, req.body.transactionId, repository)) {
            res.status(202).json({message: "Accepted"})

            return
        }
        let domainResponse = await domain.debiting(req.params.id, req.body.coins, repository)
        switch (domainResponse.status) {
            case "Database error":
                res.status(500).json({ ErrorMessage: "Database Error"})
                break;

            case "Excess refused":
                await repository.updateTransactionId(id, req.body.transactionId)
                res.status(400).json({ ErrorMessage: "Insufficient Credit"})

                break;
            case "Wallet debited":
                await repository.updateTransactionId(id, req.body.transactionId)
                res.status(201).json({
                    "transactionId" : req.body.transactionId,
                    "coins" : domainResponse.balance
                })
                break;
        }
    }
}

module.exports = {debitHandler}