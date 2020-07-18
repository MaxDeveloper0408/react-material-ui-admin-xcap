const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const scheduler = require('node-schedule');



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


var rule = new scheduler.RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
rule.second = 00;
rule.dayOfWeek = new scheduler.Range(0,6);
const moment = require('moment');
const User = db.user;
const Bank = db.bank;
const Case = db.case;
const Contract = db.contract;
var dailyJob = scheduler.scheduleJob('* * * * *', function(){
  console.log('update plan and available balance every day 00:00:00');
  //update user's available balance when update expire date and profit balance plan
  let now = moment();
  Contract.findAll(
    {where: {end_date: now.format("YYYY-MM-DD"), status: 'processing'},
    raw: true}
  )
  .then((expired_datas) => {
      if(expired_datas.length > 0){
        expired_datas.forEach(function (item, index) {
          Contract.update(
            {status: 'expired'},
            {
              where: {id: item.id},
            }).then((updated_data) => {
              console.log('Successfully expired');
              let added_value = item.invest_type=='FLEXIVEL' ? 
              (Number(item.open_value) + Number(item.open_value*10/100)) 
              : (Number(item.open_value) + Number(item.open_value*30/100))

              Case.increment(
                {balance: added_value},
                {where: {user_id: item.user_id}}
              ).then((added_value_data) => {
                console.log('Successfully added to case. Now avaliable balance is' + added_value);
              })
            })
          })
      }
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
