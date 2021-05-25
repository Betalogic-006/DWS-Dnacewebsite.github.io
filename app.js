const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactDance", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// const bodyparser = require("body-parser");

const port = 8000;


//Define mognoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

// app.use(express.static("static", options));
//Express specipic stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//pug specipic stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send("This item has been saved to the database")
  }).catch(()=>{
  res.status(400).send("item was not saved to the databse")
});

});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
