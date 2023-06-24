const { transactionCallPrepard } = require("./transaction-call");
const { accoutsData, accountChangeData } = require("./data");

const query1 = "INSERT INTO account VALUES ?";
const query2 = "INSERT INTO account_changes VALUES ?";

const queres = [query1, query2];
const data = [accoutsData, accountChangeData];

transactionCallPrepard(queres, data);
