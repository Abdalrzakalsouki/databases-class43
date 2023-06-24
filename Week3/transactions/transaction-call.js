const connection = require("./connection");

const transactionCall = (queres) => {
  try {
    connection.beginTransaction((err) => {
      queres.forEach((query) => {
        connection.query(query);
      });
      connection.commit();
    });
    console.log("Query Excuted sucessfuly");
  } catch (err) {
    console.error("Error executing transaction:", err);
    connection.rollback();
    connection.end();
  }
};

const transactionCallPrepard = (queres, prams) => {
  try {
    connection.beginTransaction((err) => {
      queres.forEach((query, index) => {
        connection.query(query, prams[index]);
      });
      connection.commit();
    });
    console.log("Query Excuted sucessfuly");
  } catch (err) {
    console.error("Error executing transaction:", err);
    connection.rollback();
    connection.end();
  }
};

module.exports = { transactionCall, transactionCallPrepard };
