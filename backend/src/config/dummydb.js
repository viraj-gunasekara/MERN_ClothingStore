//copy of db.js
//rename this to => db.js
//add mongodb cluster username & pw

const mongoose = require("mongoose")

const mongodbUrl = "mongodb+srv://<cluster username>:<mongodb cluster pw>@cluster0.6g3xqn8.mongodb.net/Clothing_Store?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
  return mongoose.connect(mongodbUrl);
}

module.exports = {connectDb};