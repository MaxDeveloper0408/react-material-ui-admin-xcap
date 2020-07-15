const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const scheduler = require('node-schedule');

var rule = new scheduler.RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
rule.second = 00;
rule.dayOfWeek = new scheduler.Range(0,6);
var dailyJob = scheduler.scheduleJob(rule, function(){
  console.log('update plan and available balance every day 00:00:00');
  //update expired date of plan
  
  //update user's available balance when update expire date and profit balance plan

});

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/plan.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
