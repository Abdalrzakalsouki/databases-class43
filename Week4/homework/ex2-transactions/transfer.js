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
    let counter1 = 1;
    const newFiled1 = {
      change_number: counter1,
      amount: amount,
      changed_date: changed_date,
      remark: `Money had been transferred to ${accountToNum}`,
    };
    const fromAccountUpdates = await cl.updateOne(
      { _id: fromAccount._id },
      {
        $push: { account_changes: newFiled1 },
        $inc: { balance: -amount },
      }
    );
    if (fromAccountUpdates === null) {
      throw new Error("Could not transfer money from the sender account");
    }
    const toAccount = await cl.findOne({ account_number: accountToNum });
    if (toAccount === null) throw new Error("Recive account does not exsist");
    let counter2 = 1;
    const newFiled2 = {
      change_number: counter2,
      amount: amount,
      changed_date: changed_date,
      remark: `Money had been recived from ${accountNum}`,
    };
    const toAccountUpdates = await cl.updateOne(
      { _id: toAccount._id },
      {
        $push: { account_changes: newFiled2 },
        $inc: { balance: +amount },
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
