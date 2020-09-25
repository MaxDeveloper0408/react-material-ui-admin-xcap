const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
const User = db.user;
const Contract = db.contract;
const Contract_pdf = db.contract_pdf;
const Case = db.case;

exports.all = (req, res) => {
  Contract.findAll({
    include: [
      {
        model: User
      }
    ]
  })
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.getAllByInvestType = (req, res) => {
    Contract.findAll({
        include: [
            {
                model: User
            }
        ],
        where: req.body
    })
        .then(datas => {
            res.status(200).send(datas)
        })
        .catch(err => {
            res.status(500).send([])
        });
}
exports.set_approve = (req, res) => {
  Contract.update(
      {status: 'processando'},
      {where: {id: req.body.id, status: 'pendente'}}
  )
  .then(user => {
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
exports.all_by_user = (req, res) => {
  Contract.findAll({
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
exports.all_by_user_it = (req, res) => {
  Contract.findAll({
      include: [
        {
          model: Contract_pdf
        }
      ],
      where: {
        user_id: req.body.user_id,
        invest_type: req.body.invest_type
      }
  })
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.add_plan = (req, res) => {
  let now = moment();
  Contract.create(
    {
      user_id: req.userId,
      open_value: req.body.open_value,
      invest_type: req.body.investment_type,
      start_date: now.format("YYYY-MM-DD"),
      status: 'processando',
      end_date: req.body.investment_type == 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
    }
  )
  .then(res_data => {
      Case.decrement(
        {balance: req.body.open_value},
          {where: {user_id: req.userId}}
      )
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}


