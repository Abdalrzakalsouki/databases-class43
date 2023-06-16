const connection = require("./connection");
const { queries2 } = require("./query");

const queryExecution = (query, queryType) => {
  connection.query(query, (error, result) => {
    if (error) {
      console.error(`Error at ${queryType}`);
      throw error;
    }
    console.log(`\x1b[34m ${queryType} Exuited Sucessfuly \x1b[0m`);
    result.forEach((row) => {
      console.log(row);
    });
  });
};

for (let i = 0; i < queries2.length; i++) {
  queryExecution(queries2[i], "Select and Join query");
}
