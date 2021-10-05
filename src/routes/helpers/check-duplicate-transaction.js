async function checkDuplicateTransaction(walletId, currentId, repository) {
    const prevTransactionId = await repository.getLastTtransactionId(walletId)
    
    return currentId === prevTransactionId
}

module.exports = {checkDuplicateTransaction}
