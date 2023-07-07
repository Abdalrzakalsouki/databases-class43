require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const seasionEposide = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  try {
    client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .insertOne({ seasionEposide })
      .then((result) => {
        console.log(
          `Created season 9 episode 13 and the document got the id ${result.insertedId}`
        );
      });
  } catch (err) {
    console.err(`Could not create an eposide ${err}`);
  }
}

async function findEpisodesExercises(client) {
  try {
    await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .findOne({ episode: "S02E02" })
      .then((result) => {
        console.log(`The title of episode 2 in season 2 is ${result.title}`);
      });

    await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .findOne({ title: "BLACK RIVER" })
      .then((result) => {
        console.log(
          `The season and episode number of the "BLACK RIVER" episode is ${result.episode}`
        );
      });

    const result = await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .find({ elements: "CLIFF" })
      .toArray();
    const elements = result.map((ele) => ele.title);
    console.log(`The episodes that Bob Ross painted a CLIFF are ${elements}`);

    await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .find({ $and: [{ elements: "CLIFF" }, { elements: "LIGHTHOUSE" }] })
      .then((result) => {
        console.log(
          `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${result.title}`
        );
      });
  } catch (err) {
    console.error(`Could not find the resources ${err}`);
  }
}

async function updateEpisodeExercises(client) {
  try {
    await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .updateOne(
        { title: "BLUE RIDGE FALLERS" },
        { $set: { title: "BLUE RIDGE FALLS" } }
      )
      .then((result) => {
        console.log(
          `Ran a command to update episode 13 in season 30 and it updated ${result.episode} episodes`
        );
      });

    const result = await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .updateMany({ elements: "BUSHES" }, { $set: { elements: "BUSH" } });
    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${result.modifiedCount} episodes`
    );
  } catch (err) {
    console.error(`Could not update the resources ${err}`);
  }
}

async function deleteEpisodeExercise(client) {
  try {
    await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .deleteOne({ episode: "S31E14" })
      .then((result) => {
        console.log(
          `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
        );
      });
  } catch (err) {
    console.error(`Could not remove the resources ${err}`);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
