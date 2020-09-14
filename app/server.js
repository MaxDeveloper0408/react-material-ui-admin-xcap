const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const scheduler = require('node-schedule');
const Sequelize = require("sequelize");

const path = require("path");
app.use(express.static(path.join(__dirname, "./public/")));
var corsOptions = {
   origin: "http://localhost:3000"
 };



app.use(cors(corsOptions));
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true }));

const Op = Sequelize.Op
const db = require("./app/models");
const Role = db.role;

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/plan.routes')(app);
require('./app/routes/deposit.routes')(app);
require('./app/routes/withdraw.routes')(app);


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

const dailyJob = scheduler.scheduleJob('* * * * *', function(){
  console.log('update plan and available balance every day 00:00:00');
  //update user's available balance when update expire date and profit balance plan
  let now = moment();
  Contract.findAll(
    {
      include: [{
        model: User,
      }],
      where: {end_date: now.format("YYYY-MM-DD"), status: 'processando'},
      raw: true
    }
  )
  .then((expired_datas) => {
      if(expired_datas.length > 0){
        expired_datas.forEach(function (item, index) {

          let added_value = item.invest_type=='FLEXIVEL' ?
            (Number(item.open_value) + Number(item.open_value*10/100))
            : (Number(item.open_value) + Number(item.open_value*8*item.user.profit_percent==null?20:item.user.profit_percent/100))
          let expired_profit_value = Number(added_value) - Number(item.open_value)

          Contract.update(
            {
              profit_value: expired_profit_value,
              status: 'concluído'
            },
            {
              where: {id: item.id},
            }).then((updated_data) => {
              console.log('Successfully expired');
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
const lastOfMonth_rule = '0 0 1 * *';
const monthlyJob = scheduler.scheduleJob('0 0 1 * *', function(){
  console.log('start monthly job');
  let now = moment();
  Case.findAll({
      include: [{
        model: User,
      }],
      where:{balance: {[Op.gte]: 5000}}
    }
    ).then( (datas) => {
    console.log(datas)
    if(datas.length > 0){
      datas.forEach(function (item, index) {
        (
          {
            user_id: item.user_id,
            open_value: item.balance,
            invest_type: 'FLEXIVEL',
            start_date: now.format("YYYY-MM-DD"),
            status: 'processando',
            end_date: moment(now.format("YYYY-MM-DD")).add(1, 'M')
          }).then((updated_data) => {
              console.log('create new plan each start day of month')
              Case.decrement(
                {balance: item.balance},
                {where: {user_id: item.user_id}}
              )
          })
        })
    }
  })
})


//app.use(express.static(path.join(__dirname, 'build')));
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});
app.use("/", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
