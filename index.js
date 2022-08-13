const express = require("express");
//set up the mongoose DB(1)
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
//set up the mongoose DB(2)
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/movement");
}

//set up the mongoose DB(3)
const movementSchema = { movement: Object };
const Movement = new mongoose.model("Movement", movementSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/movement-history", (req, res) => {
  Movement.find({}, "-_id movement", function (err, movemonts) {
    if (err) {
      console.log(err);
    } else {
      res.render("movementHistory", { movemonts: movemonts });
    }
  });
});

app.post("/", (req, res) => {
  const move = new Movement({ movement: req.body });

  move.save();

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("on port 3000");
});
