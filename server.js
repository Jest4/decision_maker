"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// home page allows you to create a poll via
// event listener which toggles the poll
app.get("/", (req, res) => {
  res.render("index");
});

//receives and processes new poll submission
//displays completed poll, with action links
app.post("/", (req, res) => {
//receives and processes new poll submission
//displays completed poll, with action links
  // res.redirect("/poll" -- "displays form, displays 2 links: votes page and results page");
});


//generates poll for voters to fill out
app.get("/vote/:id", (req, res) => {
  //
});

//takes in poll data and sends a submission notification form
app.post("/vote/submit", (req, res) => {
  res.end("thanks for your vote! You eat soon.")
});

//shows results as they are tallied
app.get("/results/:id", (req, res) => {
//displays real-time poll results
//allows you to choose criteria by which to display final tally
});

//
app.post("/results/:id", (req, res) => {
  //acts as a form that takes in your choice of winning option based on
  //preferred criteria and processes it
  //redirects to final results afterwards
});

app.get("/final_results/:id", (req, res) => {
  //displays where you will eat!
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
