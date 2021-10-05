const domainModel = require("../domain-model")
const { v4: uuidv4} = require('uuid');

test("A crediting call with an unknown id should return 'Wallet created'",
async () => {
    const data = await domainModel.crediting(uuidv4(), 1000, {
        getBalance: id => undefined,
        createWallet: (id, amount) => {},
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Wallet created",
        balance: 1000
    });
})

test("A crediting call with a known id should return 'Wallet credited'",
async () => {
    const data = await domainModel.crediting(uuidv4(), 1000, {
        getBalance: id => 1000,
        createWallet: (id, amount) => {},
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Wallet credited",
        balance: 2000
    });
})

test("A crediting call with database problems should return 'Database error'[1]",
async () => {
    const data = await domainModel.crediting(uuidv4(), 1000, {
        getBalance: id => -1000,
        createWallet: (id, amount) => {},
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})

test("A crediting call with database problems should return 'Database error'[2]",
async () => {
    const data = await domainModel.crediting(uuidv4(), 1000, {
        getBalance: id => "1000",
        createWallet: (id, amount) => {},
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})
