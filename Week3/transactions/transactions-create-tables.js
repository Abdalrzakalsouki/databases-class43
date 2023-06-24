const { transactionCall } = require("./transaction-call");

//Create account table
const query1 =
  "CREATE TABLE account (account_number INT NOT NULL, balance INT, PRIMARY KEY(account_number))";
//Create account_changes table
const query2 =
  "CREATE TABLE account_changes (change_number INT, account_number INT NOT NULL, amount INT, changed_date DATE, remark TEXT,  PRIMARY KEY (account_number))";

const queres = [query1, query2];

transactionCall(queres);
