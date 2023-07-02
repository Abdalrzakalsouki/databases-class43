/*To load the data into our clustor, we use mongoimport:
1- We install the tools
2- We set an envoriment system variable
3- We use mongoimport --uri "" --db "" --collection "" --type csv --headerline  --ignoreBlanks --file ""
*/

const MongoClient = require("mongodb").MongoClient;

const firstAggreation = async (collection) => {
  const pipline = [
    {
      $group: {
        countPopulation: {
          $sum: {
            $add: ["$M", "$F"],
          },
        },
        _id: "$Year",
      },
    },
  ];
  const result = collection.aggregate(pipline).toArray((err, res) => {
    if (err) throw err;
  });
  return result;
};

const secondAggreation = async (collection, age) => {
  const pipline = [
    {
      $match: {
        Country: {
          $in: [
            "AFRICA",
            "EUROPE",
            "NORTH AMERICA",
            "EUROPE",
            "SOUTH AMERICA",
            "OCEANIA",
          ],
        },
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $sum: {
            $add: ["$M", "$F"],
          },
        },
      },
    },
  ];
  const result = collection.aggregate(pipline).toArray((err, res) => {
    if (err) throw err;
  });
  return result;
};

const performAggreation = async (databaseName, collectionName) => {
  const url = process.env.MONGODB_URL;
  const connection = new MongoClient(url);
  try {
    const client = await connection.connect();
    console.log("Connection Established");
    const db = await client.db(databaseName);
    const cl = await db.collection(collectionName);
    const res1 = await firstAggreation(cl);
    const res2 = await secondAggreation(cl, "100+");
    client.close();
  } catch (err) {
    throw err;
  }
};

performAggreation("databaseWeek4", "population_ country");
