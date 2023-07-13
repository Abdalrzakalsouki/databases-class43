const accounts = [
  {
    account_number: 100,
    balance: 5000,
    account_changes: [
      {
        change_number: 0,
        amount: 0,
        changed_date: "2000-01-01",
        remark: "Nothing",
      },
    ],
  },
  {
    account_number: 101,
    balance: 1000,
    account_changes: [
      {
        change_number: 0,
        amount: 0,
        changed_date: "2000-01-01",
        remark: "Nothing",
      },
    ],
  },
  {
    account_number: 102,
    balance: 0,
    account_changes: [
      {
        change_number: 0,
        amount: 0,
        changed_date: "2000-01-01",
        remark: "Nothing",
      },
    ],
  },
  {
    account_number: 300,
    balance: 10000,
    account_changes: [
      {
        change_number: 0,
        amount: 0,
        changed_date: "2000-01-01",
        remark: "Nothing",
      },
    ],
  },
];
const seedData = async (collection) => {
  await collection.deleteMany({});
  const result = await collection.insertMany(accounts);
  return result;
};

module.exports = seedData;
