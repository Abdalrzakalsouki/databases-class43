const connection = require("./connection");
const { tables, fields, fieldsTypes, values } = require("./Query");

const normalQuery = (query, queryType) => {
  connection.query(query, (error) => {
    if (error) {
      console.error(`Error at ${queryType}`);
      throw error;
    }
  });
  console.log(`${queryType} Exuited Sucessfuly`);
};

const parametrizedQuery = (query, params, queryType) => {
  connection.query(query, [params], (error) => {
    if (error) {
      console.error(`Error at query type: ${queryType}`);
      throw error;
    }
  });
  console.log("query Exuited Sucessfuly");
};

const createTable = (title, fields) => {
  const query = `CREATE TABLE IF NOT EXISTS ${title} (${fields})`;
  normalQuery(query, "Creation");
};

const insertIntoTable = (title, fields, values) => {
  const query = `INSERT INTO ${title} (${fields}) VALUES ?`;
  parametrizedQuery(query, values, "Inserting");
};

const main = () => {
  //Creating
  tables.forEach((table, index) => createTable(table, fieldsTypes[index]));

  //Inserting
  tables.forEach((table, index) => {
    insertIntoTable(table, fields[index], values[index]);
  });

  connection.end();
};

main();
