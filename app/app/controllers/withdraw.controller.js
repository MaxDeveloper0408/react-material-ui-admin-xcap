const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
const User = db.user;
const Withdraw = db.withdraw;
const Case = db.case;

exports.all = (req, res) => {
  Withdraw.findAll({include: [User]})
  .then(datas => {
    console.log(datas)
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.set_approve = (req, res) => {
  Withdraw.update(
      {status: 'approved'},
      {where: {id: req.body.id, status: 'pending'}}
  )
  .then(user => {
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
exports.all_by_user = (req, res) => {
  Withdraw.findAll({
      where: {
        user_id: req.body.user_id
      }
  })
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.add = (req, res) => {
  let now = moment();
  Withdraw.create(
    {
      user_id: req.userId,
      value: req.body.withdraw_value,
      status: 'pending'
    }
  )
  .then(res_data => {
      Case.decrement(
        {balance: req.body.withdraw_value},
          {where: {user_id: req.userId}}
      )
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}


