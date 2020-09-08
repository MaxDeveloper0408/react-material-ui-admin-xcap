const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
const User = db.user;
const Contract = db.contract;
const Case = db.case;

const Deposit = db.deposit;

exports.all = (req, res) => {
  Deposit.findAll({include: [User]})
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}

exports.set_approve = (req, res) => {
  console.log(req.body)
  Deposit.update(
      {status: 'aprovado', admin_value: req.body.admin_value},
      {where: {id: req.body.id, status: 'pendente'}}
  )
  .then(user => {
      let now = moment();
      Contract.create(
        {
          user_id: req.body.user_id,
          open_value: req.body.admin_value,
          invest_type: req.body.investment_type,
          start_date: now.format("YYYY-MM-DD"),
          status: 'processando',
          end_date: req.body.investment_type == 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
        }
      )
      .then(res_data => {
          return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
      })
      .catch(err => {
          return res.status(500).send({ status:'fail', message: err.message });
      });
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
exports.all_by_user = (req, res) => {
  Deposit.findAll({
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
  Deposit.create(
    {
      user_id: req.userId,
      user_value: req.body.user_value,
      invest_type: req.body.investment_type,
      status: 'pendente',
    }
  )
  .then(res_data => {
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
