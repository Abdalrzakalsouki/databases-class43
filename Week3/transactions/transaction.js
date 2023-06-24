const { transactionCallPrepard } = require("./transaction-call");

const changeNumber = 102;
const accountNumber = 101;
const amount = 1000;
1;
const changed_date = new Date().toISOString().slice(0, 10);
const remark = "some transactions";

const data = [[[[changeNumber, accountNumber, amount, changed_date, remark]]]];

const query = "INSERT INTO account_changes VALUES ? ";

transactionCallPrepard([query], data);
