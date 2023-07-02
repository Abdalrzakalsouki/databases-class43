const MongoClient = require("mongodb").MongoClient;
const seedData = require("./setup");

const transfer = async (cl, connection, accountNum, accountToNum, amount) => {
  const session = connection.startSession();
  session.startTransaction();
  try {
    const fromAccount = await cl.findOne({
      account_number: accountNum,
      balance: { $gte: amount },
    });
    if (fromAccount === null)
      throw new Error("There is no enough balance to perform the opreation");
    const changed_date = new Date().toISOString().slice(0, 10);
    const fromAccountUpdates = await cl.updateOne(
      { _id: fromAccount._id },
      {
        $inc: { balance: -amount, "account_changes.0.change_number": +1 },
        $set: {
          "account_changes.0.amount": amount,
          "account_changes.0.changed_date": changed_date,
          "account_changes.0.remark": `Money had been transferred to ${accountToNum}`,
        },
      }
    );
    if (fromAccountUpdates === null) {
      throw new Error("Could not transfer money from the sender account");
    }
    const toAccount = await cl.findOne({ account_number: accountToNum });
    if (toAccount === null) throw new Error("Recive account does not exsist");

    const toAccountUpdates = await cl.updateOne(
      { _id: toAccount._id },
      {
        $inc: { balance: +amount, "account_changes.0.change_number": +1 },
        $set: {
          "account_changes.0.amount": amount,
          "account_changes.0.changed_date": changed_date,
          "account_changes.0.remark": `Money had been recived from ${accountNum}`,
        },
      }
    );
    if (toAccountUpdates === null)
      throw new Error("Could not recive money from the sender account");
    await session.commitTransaction();
  } catch (err) {
    console.error(`Failed to transfer ${err}`);
    await session.abortTransaction();
  }
  session.endSession();
};

const main = async (databaseName, collectionName) => {
  const url = process.env.MONGODB_URL;
  const connection = new MongoClient(url);
  try {
    const client = await connection.connect();
    console.log("Connection Established");
    const db = await client.db(databaseName);
    const cl = await db.collection(collectionName);
    await seedData(cl);
    await transfer(cl, connection, 101, 102, 1000);
    client.close();
  } catch (err) {
    throw err;
  }
};

main("Transactions", "accounts");
