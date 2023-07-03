const connection = require("./connection");

const transfer = async (accountFrom, accountTo, amount) => {
  connection.beginTransaction();
  try {
    const selectSender =
      "SELECT account_number FROM account WHERE balance >= ? FOR UPDATE";
    connection.query(selectSender, [amount], (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        throw new Erorr("No enough balance to complete the opreation ");
    });
    const selectReciver =
      "SELECT account_number FROM account WHERE account_number = ? FOR UPDATE";
    connection.query(selectReciver, [accountTo], (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        throw new Erorr("The reciver account does not exsist ");
    });
    const updateBalance =
      "UPDATE account SET balance = CASE WHEN account_number = ? THEN balance - ? WHEN account_number = ? THEN balance + ? ELSE balance END WHERE account_number IN (?, ?);";
    connection.query(
      updateBalance,
      [accountFrom, amount, accountTo, amount, accountFrom, accountTo],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0)
          throw new Erorr("Could not update the accont balance");
      }
    );
    const changed_date = new Date().toISOString().slice(0, 10);
    const remark = `Transferd ${amount} From ${accountFrom} account`;
    const updateAccountChanges =
      "UPDATE account_changes SET amount = ?, changed_date = ?, remark = ? , change_number = ? WHERE account_number = (SELECT account_number FROM account WHERE account_number = ?)";
    connection.query(
      updateAccountChanges,
      [amount, changed_date, remark, accountTo, accountFrom],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0)
          throw new Erorr("Could not update the accont balance");
      }
    );
    connection.commit();
  } catch (err) {
    console.error(err);
    connection.rollback();
  }
  connection.end();
};

transfer("101", "102", 1000);
