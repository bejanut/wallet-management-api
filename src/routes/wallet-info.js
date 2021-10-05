const domain = require("../domain/domain-model")
const pool = require("../database/pools/wallet-pool").value
const Repository = require("../database/postgres-repository")
const repository = new Repository(pool)

async function infoHandler(req, res) {
    const id = req.params.id
    const domainResponse = await domain.walletInfo(id, repository)

    switch (domainResponse.status) {
        case "Wallet not found":
            res.status(404).json({ ErrorMessage: "Wallet doesn't exist"})
            break;

        case "Database error":
            res.status(500).json({ ErrorMessage: "Database Error"})
            break;

        case "Success accesing wallet":
            const lastTransaction = await repository.getLastTtransactionId(id)
            let version = await repository.getLastVersion(id)
            res.status(200).json({
                "transactionId" : lastTransaction,
                version,
                "coins" : domainResponse.balance
            })
            version++
    }
}

module.exports = {infoHandler}