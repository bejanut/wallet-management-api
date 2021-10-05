CREATE TABLE IF NOT EXISTS lnd_wallet.accounts_table (
    id text not null
    constraint wallet_id_pk
    primary key not null,
    balance integer not null,
    lastTransaction text not null,
    version integer not null
);

