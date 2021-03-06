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
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  } else if (mailtype == "vote") {
    let data = {
      from: 'iHangry PollMaster<postmaster@mg.ihangry.ca>',
      to: poll_data.admin_email,
      subject: `Vote submitted to ${poll_data.poll_name}`,
      text: `Someone has submitted a vote to your poll, ${poll_data.poll_name}!
      ADMIN PAGE! (DONT SEND THIS ONE!) http://localhost:8080/admin/${poll_data.result_link}
      Results! (send out this link if you want!) http://localhost:8080/results/${poll_data.result_link}`
    };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  }
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
let final_results_url = stringGen()
  knex('polls').insert({poll_title: req.body.poll_name, admin_email: req.body.admin_email, vote_link: vote_url, result_link: results_url, final_result_link: final_results_url})
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
  emailAdmin(poll_data, "create")
  let templateVars = {}
  templateVars.poll_data = poll_data;
  templateVars.title = "iHANGRY vote";
  res.send(results_url);
});

app.get("/list", (req, res) => {
  res.render("list", {title: "Create Poll"});
});

//displays completed poll in the form that others can see it
//features two action links, one to share results and one to check out results
// app.get("/poll/:id", (req, res) => {
  // res.render("/views/poll", {title: "Create Poll"})
  //test id: 1abcdefg
  //test url: http://localhost:8080/poll/1abcdefg
// });


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
      .returning("*")
      .then(function(results) {
        knex('polls').select().where('poll_id' , results[0].poll_id)
        .then(function(results) {
          let poll_data = {poll_name: results[0].poll_title, admin_email: results[0].admin_email, admin_link: results[0].result_link, result_link: results[0].final_result_link}
          console.log("POLL DATA:", poll_data, "\n / POLL DATA")
          emailAdmin(poll_data, "vote");
        })
      });
          res.redirect("http://localhost:8080/");
      // });
  // TODO: figure out the redirection
  // figure out a thank you pop up message
});

//shows results as they are tallied
app.get("/admin/:id", (req, res) => {
  let templateVars = {};

  knex('votes').select('choice_name', knex.raw('SUM(vote_weight)'))
  .join('choices', {'votes.choice_id': 'choices.choice_id'})
  .join('polls', {'votes.poll_id' : 'polls.poll_id'})
  .where('polls.result_link' , req.params.id)
  .groupBy('choice_name', 'choices.choice_id')
  .orderByRaw('sum(vote_weight) desc')
  .orderBy('choices.choice_id')
  .then(function(results) {
    knex('votes').distinct('voter_name')
    .join('polls', {'votes.poll_id' : 'polls.poll_id'})
    .where('polls.result_link', req.params.id)
    .select()
    .then(function(res2) {
      knex('polls').select('final_result_link', 'vote_link', 'poll_title')
      .where('polls.result_link', req.params.id)
      .then(function(res_link) {
        templateVars.names = res2;
        if ( !res_link[0] ) { templateVars.title = 'iHangry' } else { templateVars.title = res_link[0].poll_title }
        templateVars.choices = results;
        if ( !res_link[0] ) { } else { templateVars.final_result_link = res_link[0].final_result_link; }
        if ( !res_link[0] ) { } else { templateVars.vote_link = res_link[0].vote_link; }
        res.render('admin', templateVars)
      });
    });
  });

//displays real-time poll results
//allows you to choose criteria by which to display final tally
});


//shows results as they are tallied
app.get("/results/:id", (req, res) => {
  let templateVars = {};

    knex('votes').select('choice_name', knex.raw('SUM(vote_weight)'))
  .join('choices', {'votes.choice_id': 'choices.choice_id'})
  .join('polls', {'votes.poll_id' : 'polls.poll_id'})
  .where('polls.final_result_link', req.params.id)
  .groupBy('choices.choice_name', 'choices.choice_id')
  .orderByRaw('sum(vote_weight) desc')
  .orderByRaw('choices.choice_id')
  .limit(1)
  .then(function(results) {

    knex('votes').distinct('voter_name')
    .join('polls', {'votes.poll_id' : 'polls.poll_id'})
    .where('polls.final_result_link', req.params.id)
    .select()
    .then(function(res2) {
      templateVars.choices = results;
      templateVars.names = res2;
      templateVars.title = 'iHangry';
      res.render('final_results', templateVars)
    });
  });
});

//
app.post("/results/:id", (req, res) => {
  //acts as a form that takes in your choice of winning option based on
  //preferred criteria and processes it
  //redirects to final results afterwards
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About iHangry"});
});

app.get("/contact", (req, res) => {
  res.render("contact", {title: "About iHangry"});
});

// app.get("/final_results/:id", (req, res) => {
  // {title: "Create Poll"} --don't forget!
  //displays where you will eat!
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



