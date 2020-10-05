const constant_config = require("../config/constant.config.js");
const Sequelize = require("sequelize");
const moment = require('moment');
const db = require("../models");
const bcrypt = require('bcryptjs');
const User = db.user;
const Bank = db.bank;
const Case = db.case;
const Contract = db.contract;
const Contract_percent = db.contract_percent;
const Contract_pdf = db.contract_pdf;
const Bank_list = db.bank_list;
const Case_deposit = db.case_deposit;
const Withdraw = db.withdraw;

const multer = require('multer');
const path = require('path');
const multerHelper = require('./multer.helper');
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const Op = Sequelize.Op;
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.userAll = (req, res) => {
    User.findAll({
        where: {
            admin: '0'
        }
    })
    .then(users => {
      res.status(200).send(users)
    })
    .catch(err => {
      res.status(500).send([])
    });
}
exports.userActiveAll = (req, res) => {
  User.findAll({
      where: {
          admin: '0',
          active: 'YES'
      }
  })
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.userDeactiveAll = (req, res) => {
  User.findAll({
      where: {
          admin: '0',
          active: 'NO'
      }
  })
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.userOne = (req, res) => {
  User.findOne({
      where: {
          id: req.body.id
      }
  })
  .then(user => {
    res.status(200).send(user)
  })
  .catch(err => {
    res.status(500).send({})
  });
}
exports.update = (req, res) => {
  let user = req.body;
  let id = req.body.id;
  delete user.id;
  delete user.updatedAt;
  if(user.password)
    user.password = bcrypt.hashSync(user.password, 8);
  User.update(
      user,
      {where: {id: id}}
  )
  .then(user => {
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
exports.updatePassword = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.current_password,
      user.password
    );
    console.log(passwordIsValid);
    if (!passwordIsValid) {
      return res.status(401).send({ status:'fail', message: "Senha inválida!" });
    }

    User.update(
      {password: bcrypt.hashSync(req.body.password, 8)},
      {where: {id: req.body.id}}
    )
    .then(user => {
        return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

}
exports.delete = (req, res) => {
  console.log(req.body)
    User.destroy(
        {where: {id: req.body.id}}
    )
    .then(user => {
        return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
}
exports.setActive = (req, res) => {
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}, fileFilter: multerHelper.pdfFilter}).single('admin_pdf');
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.status(200).send({ status:'fail', message: req.fileValidationError });
        }
        else if (!req.file) {
          User.update(
            {
              active: req.body.active,
            },
            {where: {id: req.body.userId}}
          )
          .then(user => {
              let now = moment();
              Contract.create(
                {
                  user_id: req.body.userId,
                  open_value: req.body.investment,
                  invest_type: req.body.investment_type,
                  start_date: now.format("YYYY-MM-DD"),
                  status: 'processando',
                  percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
                  end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
                }
              )
              .then(res_data => {

                  let contract_pdf_create = {
                    user_id: req.body.userId,
                    invest_type: req.body.investment_type,
                  }
                  if (req.body.investment_type === 'FLEXIVEL') {
                    Contract_pdf.create(contract_pdf_create)
                  } else if (req.body.investment_type === 'CRESCIMENTO') {
                    Contract_percent.create({
                        contract_id: res_data.id,
                        percent: constant_config.CRESC_DEFAULT_PERCENT
                    })
                    contract_pdf_create = {
                      user_id: req.body.userId,
                      invest_type: req.body.investment_type,
                      contract_id: res_data.id
                    }
                    Contract_pdf.create(contract_pdf_create)

                  }
                  Case.count({
                    where: {user_id: req.body.userId}}).then(count => {
                    if( count === 0 ) {
                      Case.create({user_id: req.body.userId, balance: 0}).then(create_case => {
                        console.log(create_case)
                      })
                    }
                  })
                  return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
              })
              .catch(err => {
                  return res.status(200).send({ status:'fail', message: err.message });
              });
          })
          .catch(err => {
              return res.status(200).send({ status:'fail', message: err.message });
          });
          return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
        }
        else if (err instanceof multer.MulterError) {
          return res.status(200).send({ status:'fail', message: err });
        }
        else if (err) {
          return res.status(200).send({ status:'fail', message: err });
        }else if (req.file) {
          User.update(
            {
              active: req.body.active,
            },
            { where: { id: req.body.userId } }
          )
            .then(user => {
              let now = moment();
              Contract.create(
                {
                  user_id: req.body.userId,
                  open_value: req.body.investment,
                  invest_type: req.body.investment_type,
                  start_date: now.format("YYYY-MM-DD"),
                  status: 'processando',
                  percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
                  end_date: req.body.investment_type == 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
                }
              )
                .then(res_data => {
                  let contract_pdf_create = {
                    user_id: req.body.userId,
                    admin_pdf: req.file.path,
                    invest_type: req.body.investment_type,
                  }
                  if (req.body.investment_type === 'FLEXIVEL') {
                    contract_pdf_create = {
                      user_id: req.body.userId,
                      admin_pdf: req.file.path,
                      invest_type: req.body.investment_type,
                    }
                  } else if (req.body.investment_type === 'CRESCIMENTO') {
                      Contract_percent.create({
                          contract_id: res_data.id,
                          percent: constant_config.CRESC_DEFAULT_PERCENT
                      })
                      contract_pdf_create = {
                          user_id: req.body.userId,
                          admin_pdf2: req.file.path,
                          invest_type: req.body.investment_type,
                          contract_id: res_data.id
                      }
                  }
                  Contract_pdf.create(contract_pdf_create)
                  Case.count({
                    where: { user_id: req.body.userId }
                  }).then(count => {
                    if (count == 0) {
                      Case.create({ user_id: req.body.userId, balance: 0 }).then(create_case => {
                        console.log(create_case)
                      })
                    }
                  })
                  return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
                })
                .catch(err => {
                  return res.status(200).send({ status: 'fail', message: err.message });
                });
            })
            .catch(err => {
              return res.status(200).send({ status: 'fail', message: err.message });
            });
        }
    })

}


exports.userBank = (req, res) => {
  Bank.findOne({
      include: [{
        model: Bank_list,
      }],
      where: {
          user_id: req.body.user_id
      }
  })
  .then(bank => {
    res.status(200).send(bank)
  })
  .catch(err => {
    res.status(500).send({})
  });
}

exports.bankUpdate = (req, res) => {
  let bank = req.body;

  Bank.findOne({
    where: {
        user_id: req.body.user_id
    }
  })
  .then(res_data => {
    if(!res_data) {
      Bank.create(
        bank
      )
      .then(res_data => {
          return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
      })
      .catch(err => {
          return res.status(500).send({ status:'fail', message: err.message });
      });
    } else {
      let user_id = req.body.user_id;
      delete bank.user_id;
      delete bank.updatedAt;
      Bank.update(
        bank,
        {where: {user_id: user_id}}
      )
      .then(res_data => {
          return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
      })
      .catch(err => {
          return res.status(500).send({ status:'fail', message: err.message });
      });
    }
  }).catch(err => {
    return res.status(500).send({ status:'fail', message: err.message });
  });


}

exports.getBalance = (req, res) => {
  let now = moment();
  console.log('-----------get balance-------------')
    if(moment().isBetween(now.date(2).format("YYYY-MM-DD"), now.endOf('month').format("YYYY-MM-DD"))) {
      console.log('-----------get balance-------------')
      Case.findOne({
          include: [{
            model: User,
          }],
          where: {
              user_id: req.body.user_id
          }
      })
      .then(data => {
          console.log('-----------get balance-------------')
          console.log(data)
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(200).send({status: 'fail', message: "Você não tem saldo suficiente"})
      });
  }else {
        console.log('-----------get balance-------------')
    res.status(200).send({status: 'fail', title: 'Saque', message: 'O saque ficará disponível entre os dias 25 e 30 de cada mês.'})
  }

}
exports.contract_all = (req, res) => {
  Contract_pdf.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'cpf', 'email', 'full_name'],
      },
      {
        model: Contract
      }
    ],
    where: req.body
  })
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.contract_by_user = (req, res) => {
  Contract_pdf.findOne({
      where: {
          user_id: req.body.user_id
      }
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(null)
  });
}
exports.download_contract = (req, res) => {
  const filepath = req.body.pdf_path;
  res.download(filepath, "contract.pdf")
}

exports.admin_upload_contract = (req, res) => {
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}, fileFilter: multerHelper.pdfFilter}).single('admin_pdf');
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.status(200).send({ status:'fail', message: req.fileValidationError });
        }
        else if (!req.file) {
            return res.status(200).send({ status:'fail', message: 'please select file' });
        }
        else if (err instanceof multer.MulterError) {
          return res.status(200).send({ status:'fail', message: err });
        }
        else if (err) {
          return res.status(200).send({ status:'fail', message: err });
        }
        let update_data = {
          user_id: req.body.userId,
          admin_pdf: req.file.path
        }
        if(req.body.pdf_field == "admin_pdf") {
          update_data = {
            user_id: req.body.userId,
            admin_pdf: req.file.path
          }
        }else if(req.body.pdf_field == 'admin_pdf2'){
          update_data = {
            user_id: req.body.userId,
            admin_pdf2: req.file.path
          }
        }
        Contract_pdf.update(
          update_data,
          {where: {contract_id: req.body.id}}
        )
        .then(res_data => {
          return res.status(200).send({ status:'success', message: "upload success" });
        })
        .catch(err => {
            return res.status(200).send({ status:'fail', message: "upload fail" });
        });
    })
}
exports.user_upload_contract = (req, res) => {
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}, fileFilter: multerHelper.pdfFilter}).single('user_pdf');
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.status(200).send({ status:'fail', message: req.fileValidationError });
        }
        else if (!req.file) {
            return res.status(200).send({ status:'fail', message: 'please select file' });
        }
        else if (err instanceof multer.MulterError) {
          return res.status(200).send({ status:'fail', message: err });
        }
        else if (err) {
          return res.status(200).send({ status:'fail', message: err });
        }
        let update_data = {
          user_pdf: req.file.path
        }
        let where_con = {user_id: req.userId}
        if(req.body.pdf_field == "user_pdf") {
          update_data = {
            user_pdf: req.file.path
          }
        }else if(req.body.pdf_field == 'user_pdf2'){
          update_data = {
            user_pdf2: req.file.path
          }
          where_con = {user_id: req.userId, contract_id: req.body.contract_id}
        }
        Contract_pdf.update(
          update_data,
          {where: where_con}
        )
        .then(res_data => {
          return res.status(200).send({ status:'success', message: "upload success" });
        })
        .catch(err => {
            return res.status(200).send({ status:'fail', message: "upload fail" });
        });
    })
}
exports.download_user_contract = (req, res) => {
  Contract_pdf.findOne({where: {user_id: req.userId}}).then(data => {

    let filepath = data.admin_pdf

    if(req.body.invest_type == 'CRESCIMENTO') {
      filepath = data.admin_pdf2
    }else if(req.body.invest_type == 'FLEXIVEL') {
      filepath = data.admin_pdf
    }
    res.download(filepath, "contract.pdf")
  })

}
exports.download_user_contract_by_cp = (req, res) => {
  Contract_pdf.findOne({where: {id: req.body.contract_pdf_id}}).then(data => {
    const filepath = data.admin_pdf2
    res.download(filepath, "contract.pdf")
  })

}
exports.check_cpf_user = (req, res) => {
  User.findOne({where: {cpf: req.body.cpf, active: 'YES'}}).then(data => {
    return res.status(200).send({cpf_user: data})
  }).catch(err => {
    return res.status(200).send({cpf_user: null});
  });
}

exports.bank_all = (req, res) => {
  Bank_list.findAll()
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}


exports.all_case_deposit = (req, res) => {
  Case_deposit.findAll({include: [User]})
  .then(datas => {
    res.status(200).send(datas)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.add_fund = (req, res) => {
  let now = moment();
  Case_deposit.create(
    {
      admin_id: req.userId,
      user_id: req.body.user_id,
      amount: req.body.amount,
    }
  )
  .then(res_data => {
      Case.count({where: {user_id: req.body.user_id}}).then(count => {
        if(count == 0 ) {
          Case.create({user_id: req.body.user_id, balance: req.body.amount}).then(create_case => {
          })
        }else if(count > 0) {
          Case.increment(
            {balance: req.body.amount},
              {where: {user_id: req.body.user_id}}
          )
        }
      })
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}

exports.setProfit = (req, res) => {
  User.update(
      {profit_percent: req.body.profit_percent},
      {where: {id: req.body.user_id}}
  )
  .then(user => {
      return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}

exports.getPlanSum = (req, res) => {
  let param = { where: { invest_type: req.body.invest_type } };
  if(req.body.invest_type == '' || req.body.invest_type == null) {
    param = {};
  }
  Contract.sum('open_value', param).then(sum => {
    return res.status(200).send({ status:'success', sum: sum })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}
exports.getPlanSumByUser = (req, res) => {
  console.log(req.userId)
  let param = { where: { invest_type: req.body.invest_type, user_id: req.userId } };
  if(req.body.invest_type == '' || req.body.invest_type == null) {
    param = { where: { user_id: req.userId } };
  }
  Contract.sum('open_value', param).then(sum => {
    Contract.max('end_date', param).then(max => {
      return res.status(200).send({ status:'success', sum: sum, max: max })
    }).catch(err => {
      return res.status(200).send({ status:'fail', message: err.message })
    })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}

exports.getPlanExpDateByUser = (req, res) => {
  let param = { where: { invest_type: req.body.invest_type, user_id: req.userId } };
  if(req.body.invest_type == '' || req.body.invest_type == null) {
    param = {};
  }
  Contract.max('end_date', param).then(max => {
    return res.status(200).send({ status:'success', max: max })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}

exports.withdraw_sum_pending = (req, res) => {
  Withdraw.sum('value', {where: {status: 'pendente'}}).then(sum => {
    return res.status(200).send({ status:'success', sum: sum })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}
exports.withdraw_sum_paid = (req, res) => {
  Withdraw.sum(
    'value',
    { where:
      {
        status: 'concluído',
        updatedAt: {
          [Op.gt]: moment(moment().format("YYYY-MM-DD")).subtract(1,'months').startOf('month').format('YYYY-MM-DD'),
          [Op.lte]: moment(moment().format("YYYY-MM-DD")).subtract(1,'months').endOf('month').format('YYYY-MM-DD')
        }
      }
    }
  )
  .then(sum => {
    return res.status(200).send({ status:'success', sum: sum })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}
exports.active_users_count = (req, res) => {
  User.count({where: {active: 'YES', admin: '0'}}).then(count => {
    return res.status(200).send({ status:'success', sum: count })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}

exports.getExpiredProfitSumByUser = (req, res) => {
  Contract.sum('profit_value', { where: { status: 'concluído', user_id: req.userId } }).then(sum => {
    return res.status(200).send({ status:'success', sum: sum })
  }).catch(err => {
    return res.status(200).send({ status:'fail', message: err.message })
  })
}

exports.plan_numbers_this_month = (req, res) => {
    Contract.count(
        {
            where: {
                invest_type: 'CRESCIMENTO',
                status: 'processando',
                start_date: {
                    [Op.gte]: moment(moment().format('YYYY-MM-DD')).subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
                    [Op.lte]: moment(moment().format('YYYY-MM-DD')).subtract(0, 'months').endOf('month').format('YYYY-MM-DD')
                }
            }
        }
    ).then(count => {
        return res.status(200).send({ status: 'success', sum: count });
    }).catch(err => {
        return res.status(200).send({ status: 'fail', message: err.message });
    });
};
exports.cresc_plan_total = (req, res) => {
/*    Contract.findAll({
        attributes: [
            [Sequelize.literal('SUM(open_value + 8 * open_value * percent / 100)'), 'totalsum']
        ],
        where: {
            invest_type: 'CRESCIMENTO',
            status: 'processando'
        }
    }).then(result => {
        return res.status(200).send({ status:'success', sum: result })
    }).catch(err => {
        return res.status(200).send({ status:'fail', message: err.message })
    })
    Contract.sum('open_value', { where: { invest_type: 'CRESCIMENTO' } }).then(sum => {
        return res.status(200).send({ status:'success', sum: sum })
    }).catch(err => {
        return res.status(200).send({ status:'fail', message: err.message })
    })*/


    Contract.findAll(
        {
            where: { status: 'processando', invest_type: 'CRESCIMENTO' },
            raw: true
        }
    ).then((expired_datas) => {
            var total_sum = 0;
            if (expired_datas.length > 0) {
                expired_datas.forEach(function(item, index) {
                    var item_total_sum = Number(item.open_value)
                    for(let i = 1; i <= 8; i++){
                        item_total_sum = item_total_sum*item.percent + item_total_sum
                    }
                    total_sum = total_sum + item_total_sum
                });
                return res.status(200).send({ status:'success', sum: total_sum})
            }else {
                return res.status(200).send({ status:'success', sum: 0 })
            }
        }).catch(err => {
            return res.status(200).send({ status:'fail', message: err.message })
        });
}