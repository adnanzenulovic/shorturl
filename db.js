const mongoose = require("mongoose");
require("dotenv").config();
const urlMongo = process.env.MONGO;
mongoose.connect(urlMongo, {});
