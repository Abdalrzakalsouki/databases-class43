const connection = require("./connection");
const { queries } = require("./Query");
//const fs = require("fs");

/*
! Create new database or refacter the data
const sql = fs.readFileSync("../databases/world.sql", "utf-8");

connection.query(sql, (error) => {
  if (error) throw error;
  console.log("Database excuted sucessfuly");
});
*/

//Changing database
connection.changeUser({ database: process.env.DATABASE_2 }, (error) => {
  if (error) throw error;
  console.log("Sucessfuly changed the database");
});

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

const main = () => {
  //Executing queries
  for (let i = 0; i < queries.length; i++) {
    queryExecution(queries[i].query, queries[i].params, "Selecting query");
  }
  connection.end();
};

main();
