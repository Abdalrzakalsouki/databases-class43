const connection = require("./connection");
const { queries } = require("./query");

const queryExecution = (query, params, queryType) => {
  connection.query(query, params, (error, result) => {
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

for (let i = 0; i < queries.length; i++) {
  queryExecution(queries[i].query, queries[i].params, "Aggregate query");
}
