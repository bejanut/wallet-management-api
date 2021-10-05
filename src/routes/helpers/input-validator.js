function validateBody(body) {
    let errors = [];
    if(body.coins === undefined) {
        errors.push("Coins is not defined");
    } else if(typeof body.coins !== 'number') {
        errors.push("Coins is not a number");
    } else if(body.coins < 0) {
        errors.push("Coins is a negative number");
    }
    if(body.transactionId === undefined) {
        errors.push("TransactionId is not defined");
    } else if(typeof body.transactionId !== 'string') {
        errors.push("TransactionId is not a string");
    }

    return errors;
}

module.exports = validateBody