const domainModel = require("../domain-model")
const { v4: uuidv4} = require('uuid');

test("A walletInfo call with an unknown id should return 'Wallet not found'",
async () => {
    const data = await domainModel.walletInfo(uuidv4(), {getBalance: id => undefined})
    expect(data).toStrictEqual({
        status: "Wallet not found",
        balance: undefined
    });
})

test("A walletInfo call with a known id should return 'Success accesing wallet'",
async () => {
    const data = await domainModel.walletInfo(uuidv4(), {getBalance: id => 1000})
    expect(data).toStrictEqual({
        status: "Success accesing wallet",
        balance: 1000
    });
})

test("A walletInfo call with database problems should return 'Database error'[1]",
async () => {
    const data = await domainModel.walletInfo(uuidv4(), {getBalance: id => -2000})
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})

test("A walletInfo call with database problems should return 'Database error'[2]",
async () => {
    const data = await domainModel.walletInfo(uuidv4(), {getBalance: id => "2000"})
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})
