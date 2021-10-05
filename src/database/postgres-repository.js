class postgresRepository {

    constructor (pool) {
        this.pool = pool
    }

    async getBalance(id) {
        try {
            const res = await this.pool.query(`SELECT balance FROM lnd_wallet.accounts_table WHERE id = '${id}';`)
            if(res.rows[0] === undefined) {
                return undefined
            } else {
                return res.rows[0].balance
            }
        } catch (error) {
            console.log("Error in getBalance function " + error.message)
            
            return undefined
        }
    }
    
    async getLastTtransactionId(id) {
        try {
            const res = await this.pool.query(`SELECT lasttransaction FROM lnd_wallet.accounts_table WHERE id = '${id}';`)
            if(res.rows[0] === undefined) {
                return undefined
            } else {
                return res.rows[0].lasttransaction
            }
        } catch (error) {
            console.log("Error in getLastTtransactionId function " + error.message)
            
            return undefined
        }
    }
    
    async getLastVersion(id) {
        try {
            const res =  await this.pool.query(`SELECT version FROM lnd_wallet.accounts_table WHERE id = '${id}';`)
            return res.rows[0].version
        } catch (error) {
            console.log("Error in getLastVersion function " + error.message)
            
            return undefined
        }
    }
    
    async updateBalance(id, balance) {
        try {
            const res = await this.pool.query(`
            UPDATE lnd_wallet.accounts_table
            SET balance = ${balance}
            WHERE id =  '${id}';`)
            
            await this.pool.query(
                `UPDATE lnd_wallet.accounts_table
                SET version = ((SELECT version FROM lnd_wallet.accounts_table WHERE id = '${id}') + 1)
                WHERE id =  '${id}';`)
                
        } catch (error) {
            console.log("Error in updateBalance function " + error.message)
    
        }
    }
    
    async updateTransactionId(id, transactionId) {
        try {
            const res = await this.pool.query(`
            UPDATE lnd_wallet.accounts_table
            SET lasttransaction = '${transactionId}'
            WHERE id = '${id}';`)
        } catch (error) {
            console.log("Error in updateTransactionId function " + error.message)
        }
    }
    
    async createWallet(id, balance) {
        try {
            const res = await this.pool.query(`INSERT INTO lnd_wallet.accounts_table VALUES ('${id}', ${balance}, 'tx123', 1);`)
        } catch (error) {
            console.log("Error in createWallet function"+ error.message)
        }
    }
    
    async deleteAllAccounts() {
        try {
            const res = await this.pool.query(`DELETE FROM lnd_wallet.accounts_table;`)
        } catch (error) {
            console.log("Error in deletAllaccounts function" + error.message)
        }
    }
}

module.exports = postgresRepository