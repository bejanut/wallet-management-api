async function walletInfo(id, repository) {
    var balance = await repository.getBalance(id)
    if(balance === undefined) {
        return walletNotFound(id)

    } else if (typeof balance !== 'number' || balance < 0){
        return repositoryError(id)

    } else {
        return {
            status: "Success accesing wallet",
            balance
        }
    }
}

async function crediting(id, amount, repository) {
    var balance = await repository.getBalance(id)
    if(balance === undefined) {
        await repository.createWallet(id, amount)
        return {
            status: "Wallet created",
            balance: amount
        }

    } else if (typeof balance !== 'number' || balance < 0){
        return repositoryError(id)

    } else {
        balance = balance + amount
        await repository.updateBalance(id, balance)
        return {
            status: "Wallet credited",
            balance
        }
    }
}

async function debiting(id, amount, repository) {
    var balance = await repository.getBalance(id)
    if(balance === undefined || (typeof balance === 'number' && balance <= amount && balance >= 0)) {
        
        return refuseExcess(id)

    } else if (typeof balance !== 'number' || balance < 0){
        
        return repositoryError(id)

    } else {
        balance = balance - amount
        await repository.updateBalance(id, balance)

        return {
            status: "Wallet debited",
            balance
        }
    }
}

function walletNotFound(id) {
    console.log("Wallet not found for id:" + id)

    return {
        status: "Wallet not found",
        balance: undefined
    }
}

function refuseExcess(id) {
    console.log("Excess refused for id:" + id)

    return {
        status: "Excess refused",
        balance: undefined
    }
}

function repositoryError(id) {
    console.log("Internal error while trying to get wallet balance for id:" + id)

    return {
        status: "Database error",
        balance: undefined
    }
}

module.exports = {walletInfo, crediting, debiting}