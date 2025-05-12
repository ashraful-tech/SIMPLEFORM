const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/simpleform";

main()
  .then(() => {
    console.log("connected to BD");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.render("users/index.ejs", { allUsers });
});

//Show Users or Index route
app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  res.render("users/index.ejs", { allUsers });
});

//Render form
app.get("/users/new", (req, res) => {
  res.render("users/form.ejs");
});

//Show Route
app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id);
  res.render("users/show.ejs", { user });
});

//Create Route
app.post("/users", async (req, res) => {
  let user = new User(req.body.user);
  const saveData = await user.save();
  console.log(saveData);
  res.redirect("/users");
});

//Edit
app.get("/users/:id/edit", async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id);
  res.render("users/edit.ejs", { user });
});

//Update route
app.put("/users/:id", async (req, res) => {
  let { id } = req.params;
  let updateUser = await User.findByIdAndUpdate(id, { ...req.body.user });
  //await updateUser.save();
  console.log(updateUser);
  res.redirect(`/users/${id}`);
});

app.delete("/users/:id", async (req, res) => {
  let { id } = req.params;
  let delUser = await User.findByIdAndDelete(id);
  console.log(`${delUser} is deleted successfully`);
  res.redirect("/users");
});

app.listen(port, () => {
  console.log(`server is listening port: ${port}`);
});
