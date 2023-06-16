const connection = require("./connection");
const { kyesFields } = require("./data");

//Changing database
connection.changeUser({ database: process.env.DATABASE_3 }, (error) => {
  if (error) throw error;
  console.log("Sucessfuly changed the database");
});

const queryExecution = (query, queryType) => {
  connection.query(query, (error) => {
    if (error) {
      console.error(`Error at ${queryType}`);
      throw error;
    }
  });
  console.log(`${queryType} Exuited Sucessfuly`);
};

const createTable = (title, fields) => {
  const query = `CREATE TABLE IF NOT EXISTS ${title} (${fields})`;
  queryExecution(query, "Creation");
};

const updateTable = () => {
  const query =
    "ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)";
  queryExecution(query, "Updating");
};

const main = () => {
  //Create Table
  const tabelTitle = "authors";
  createTable(tabelTitle, kyesFields);

  //Query
  updateTable();
};

main();
