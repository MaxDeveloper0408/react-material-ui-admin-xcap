const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
const User = db.user;
const Bank = db.bank;
const Contract = db.contract;

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
    User.update(
        {
          active: req.body.active,
          //investment: req.body.investment
        },
        {where: {id: req.body.id}}
    )
    .then(user => {
        let now = moment();
        Contract.create(
          {
            user_id: user.id,
            open_value: req.body.investment,
            invest_type: user.investment_type,
            start_date: now.format("YYYY-MM-DD")
          }
        )
        .then(res_data => {
            return res.status(200).send({ status:'success', message: "Ação realizada com sucesso!" });
        })
        .catch(err => {
            return res.status(500).send({ status:'fail', message: err.message });
        });
        
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
}


exports.userBank = (req, res) => {
  Bank.findOne({
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
