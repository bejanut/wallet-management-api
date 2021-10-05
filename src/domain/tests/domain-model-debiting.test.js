const domainModel = require("../domain-model")
const { v4: uuidv4} = require('uuid');

test("A debiting call with an unknown id should return 'Excess refused'[1]",
async () => {
    const data = await domainModel.debiting(uuidv4(), 1000, {
        getBalance: id => undefined,
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Excess refused",
        balance: undefined
    });
})

test("A debiting call with more than balance should return 'Excess refused'[2]",
async () => {
    const data = await domainModel.debiting(uuidv4(), 1000, {
        getBalance: id => 500,
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Excess refused",
        balance: undefined
    });
})

test("A debiting call with a known id and ballance greater that debited credit \
    should return 'Wallet debited'",
async () => {
    const data = await domainModel.debiting(uuidv4(), 1000, {
        getBalance: id => 2000,
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Wallet debited",
        balance: 1000
    });
})

test("A debiting call with database problems should return 'Database error'[1]",
async () => {
    const data = await domainModel.debiting(uuidv4(), 1000, {
        getBalance: id => -1000,
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})

test("A debiting call with database problems should return 'Database error'[2]",
async () => {
    const data = await domainModel.debiting(uuidv4(), 1000, {
        getBalance: id => "1000",
        updateBalance: (id, amount) => {}
    })
    expect(data).toStrictEqual({
        status: "Database error",
        balance: undefined
    });
})
