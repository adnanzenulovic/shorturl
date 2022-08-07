const express = require("express");
const app = express();
const routes = require("./routes/index");

app.set("views", __dirname + "/public");
app.set("view engine", "hbs");
app.use("/", routes);
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
