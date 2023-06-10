const connection = require("./connection");
const { tables, fields, fieldsTypes, values } = require("./Query");

const queryExuistion = (query, queryType) => {
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
  queryExuistion(query, "Creation");
};

const insertIntoTable = (title, fields, values) => {
  const query = `INSERT INTO ${title} (${fields}) VALUES (${values})`;
  queryExuistion(query, "Inseration");
};

const main = () => {
  //Creating
  for (let i = 0; i < 3; i++) {
    createTable(tables[i], fieldsTypes[i]);
  }

  //Inserting
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      insertIntoTable(tables[j], fields[j], values[j][i]);
    }
  }

  connection.end();
};

main();
