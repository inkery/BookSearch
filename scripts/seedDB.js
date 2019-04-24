const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const bookSeed = [ 
  {
    title: "Test Book 1",
    author: "J.K. Rowling",
    synopsis:
      "This Book is about the hard life of the test 1",
    date: new Date(Date.now())
  },
  {
    title: "Test Book 2",
    author: "Mary Shelley",
    synopsis:
      "This Book is about the  2nd in the series after the more family friendly Test Book 1",
    date: new Date(Date.now())
  }
];

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " You just submitted some Records !");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
