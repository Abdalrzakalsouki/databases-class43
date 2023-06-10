const connection = require("./connection");
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

const queryExuistion = (query, queryType) => {
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

const main = () => {
  const query1 = `SELECT Name FROM country WHERE Population > 8000000`;
  const query2 = `SELECT Name FROM country WHERE Name LIKE "%land%"`;
  const query3 = `Select Name from city WHERE Population BETWEEN 500000 AND 1000000`;
  const query4 = `SELECT Name FROM country WHERE Continent="Europe"`;
  const query5 = `SELECT * FROM country ORDER BY SurfaceArea DESC`;
  const query6 = `SELECT * FROM city WHERE CountryCode="NLD"`;
  const query7 = `SELECT Population FROM city WHERE Name="Rotterdam"`;
  const query8 = `SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
  const query9 = `SELECT * FROM city ORDER BY Population DESC LIMIT 10;`;
  const query10 = `SELECT SUM(Population) FROM country`;
  queryExuistion(
    query1,
    "names of countries with population greater than 8 million"
  );
  queryExuistion(query2, "names of countries that have “land” in their names");
  queryExuistion(
    query3,
    "names of the cities with population in between 500,000 and 1 million"
  );
  queryExuistion(query4, "name of all the countries on the continent ‘Europe’");
  queryExuistion(
    query5,
    "countries in the descending order of their surface areas"
  );
  queryExuistion(query6, "names of all the cities in the Netherlands");
  queryExuistion(query7, "the population of Rotterdam");
  queryExuistion(query8, "top 10 countries by Surface Area");
  queryExuistion(query9, "top 10 most populated cities");
  queryExuistion(query10, "population number of the world");

  connection.end();
};

main();
