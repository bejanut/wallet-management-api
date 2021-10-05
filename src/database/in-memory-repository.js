class Repository {
    constructor() {
        this.balanceMap = new Map();
        this.transactionMap = new Map();
        this.versionMap = new Map();
    }

    getBalance (id) {
        return this.balanceMap.get(id)
    }

    getLastTransationId (id) {
        return this.transactionMap.get(id)
    }

    getLastVersion (id, amount) {
        var version = this.versionMap.get(id, amount)
        this.versionMap.set(id, version + 1)

        return version
    }

    updateBalance (id, amount) {
        this.balanceMap.set(id, amount)
    }

    updateTransactionId (id, transactionId) {
        this.transactionMap.set(id, transactionId)
    }

    createWallet (id, amount) {
        this.balanceMap.set(id, amount)
    }
}

module.exports = Repository