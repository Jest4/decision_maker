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

const api_key = process.env.MAILGUN_KEY
const DOMAIN = 'mg.ihangry.ca';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

function emailAdmin(poll_data, mailtype) {
//THIS IS SEED DATA, should be passed data, admin_email can be sourced from req.body of post, others from keygen vars
    // NEED TO ADJUST TO INCLUDE LINKS
    // vote_link : vote_url,
    // result_link : results_url
  if (mailtype == "create") {
    let data = {
      from: 'iHangry PollMaster<postmaster@mg.ihangry.ca>',
      to: poll_data.admin_email,
      subject: `${poll_data.poll_name} Poll Created on iHangry`,
      text: `Your poll, "${poll_data.poll_name}" has been created with the following URLs:
      VOTING! (send out this link!) http://localhost:8080/vote/${poll_data.vote_link}
      ADMIN PAGE! (DONT SEND THIS ONE!) http://localhost:8080/admin/${poll_data.result_link}`
    };
  } else if (mailtype == "vote") {
    let data = {
      from: 'iHangry PollMaster<postmaster@mg.ihangry.ca>',
      to: poll_data.admin_email,
      subject: `Vote submitted to ${poll_data.poll_name}`,
      text: `Someone has submitted a vote to your poll, ${poll_data.poll_name}!
      ADMIN PAGE! (DONT SEND THIS ONE!) http://localhost:8080/admin/${poll_data.result_link}
      Results! (send out this link if you want!) http://localhost:8080/results/${poll_data.final_result_link}`
    };
  }
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

function stringGen() {
  let newString = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++) {
    newString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return newString;
}

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
// app.engine('ejs', require('express-ejs-extend'));
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
  res.render("index", {title: "Create Poll"});
});

//receives and processes new poll submission
app.post("/", (req, res) => {
//receives and processes new poll submission
// console.log(req.body)
let vote_url = stringGen()
let results_url = stringGen()
  knex('polls').insert({poll_title: req.body.poll_name, admin_email: req.body.admin_email, vote_link: vote_url, result_link: results_url})
  .returning('poll_id').then(function(poll_id_val){
    let choices = req.body.choice_title;
    let descriptions = req.body.choice_desc;
    let choiceArray = []
    choices.forEach((choice, index) => {choiceArray.push({choice_name: choice, choice_description: descriptions[index], poll_id: poll_id_val[0]})});
    knex('choices').insert(choiceArray)
      .then(function(results) {console.log('inserted choice')});
      });
  console.log('votepage: localhost:8080/vote/' + vote_url)
  console.log('resultpage: localhost:8080/results/' + results_url)
  let poll_data = {poll_name: req.body.poll_name, admin_email: req.body.admin_email, vote_link: vote_url, result_link: results_url}
  // EMAIL ADMIN WORKS! ENABLE BELOW
  // emailAdmin(poll_data, "create")
  // res.redirect("/poll" -- "displays form, displays 2 links: votes page and results page");
});

app.get("/list", (req, res) => {
  res.render("list", {title: "Create Poll"});
});

//displays completed poll in the form that others can see it
//features two action links, one to share results and one to check out results
app.get("/poll/:id", (req, res) => {
  // res.render("/views/poll", {title: "Create Poll"})
  //test id: 1abcdefg
  //test url: http://localhost:8080/poll/1abcdefg
});


//generates poll for voters to fill out
app.get("/vote/:id", (req, res) => {
  let templateVars = {};
  //TODO: add error handlers
  knex("choices").leftJoin("polls", "polls.poll_id", "choices.poll_id")
  .where("polls.vote_link", req.params.id)
  .then((results) => {
    templateVars.choices = results;
    templateVars.title = "iHANGRY vote";
    res.render("vote", templateVars);
  });
});

//takes in poll data and sends a submission notification form
app.post("/vote", (req, res) => {
// voting should lead to
let voting = []
  for (var i = 0; i < req.body.data.length; i++) {
    voting.push({'voter_name': req.body.voter_name, 'choice_id': req.body.data[i].id, 'vote_weight': (req.body.data.length)-i, 'poll_id': req.body.data[i].poll_id })
  }
  // console.log('VOTING', voting)
    knex('votes').insert(voting)
      .then(function(results) {console.log('inserted choice')});
      // });
  // TODO: figure out the redirection
  // figure out a thank you pop up message
  // emailAdmin()
  res.redirect("/");
});

//shows results as they are tallied
app.get("/results/:id", (req, res) => {
  let templateVars = {};
  // knex('polls').select('poll_id').where('result_link', req.params.id).then(function(results) {templateVars.poll_id = results;})
  knex('votes').select('choice_name', knex.raw('SUM(vote_weight)'))
  .join('choices', {'votes.choice_id': 'choices.choice_id'})
  .join('polls', {'votes.poll_id' : 'polls.poll_id'})
  .where('polls.result_link' , req.params.id)
  .groupBy('choice_name')
  .orderByRaw('sum(vote_weight) desc')
  .then(function(results) {
    templateVars.choices = results;

    knex('votes').distinct('voter_name')
    .join('polls', {'votes.poll_id' : 'polls.poll_id'})
    .where('polls.result_link', req.params.id)
    .select()
    .then(function(res2) {
      templateVars.names = res2;
      templateVars.title = 'results';
      res.render('results', templateVars)
    });
  });

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
  // {title: "Create Poll"} --don't forget!
  //displays where you will eat!
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



