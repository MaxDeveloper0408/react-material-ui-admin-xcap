const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
const User = db.user;
const Bank = db.bank;
const Case = db.case;
const Contract = db.contract;
const Contract_pdf = db.contract_pdf;

const multer = require('multer');
const path = require('path');
const multerHelper = require('./multer.helper');
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}}).single('admin_pdf');
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
        
        Contract_pdf.create({
          user_id: req.body.userId,
          admin_pdf: req.file.path
        })

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
                status: 'processing',
                end_date: req.body.investment_type == 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
              }
            )
            .then(res_data => {
                Case.count({user_id: req.body.userId}).then(count => {
                  if(count == 0 ) {
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
    })
    
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

exports.getBalance = (req, res) => {
  let now = moment();
  if(moment().isBetween(now.date(25).format("YYYY-MM-DD"), now.endOf('month').format("YYYY-MM-DD"))) {
      Case.findOne({
          include: [{
            model: User,
          }],
          where: {
              user_id: req.body.user_id
          }
      })
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(200).send({status: 'fail', message: "Don't have any balance"})
      });
  }else {
    res.status(200).send({status: 'fail', message: 'You should withdraw 25 day to 30'})
  }
  
}
exports.contract_all = (req, res) => {
  Contract_pdf.findAll({include: [User]})
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.download_contract = (req, res) => {
  const filepath = req.body.pdf_path;
  // const filepath = `public/uploads/admin_pdf-15955772746056.pdf`
  res.download(filepath, "contract.pdf")
}

exports.admin_upload_contract = (req, res) => {
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}}).single('admin_pdf');
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
        
        Contract_pdf.update(
          {
            user_id: req.body.userId,
            admin_pdf: req.file.path
          },
          {where: {id: req.body.id}}
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
  // let upload = multer({ storage: storage,limits:{fileSize:'10mb'}, fileFilter: multerHelper.pdfFilter }).single
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}}).single('user_pdf');
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
        Contract_pdf.update(
          {
            user_pdf: req.file.path
          },
          {where: {user_id: req.userId}}
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
  console.log(req.userId)
  Contract_pdf.findOne({where: {user_id: req.userId}}).then(data => {
    console.log(data)
    const filepath = data.admin_pdf
    res.download(filepath, "contract.pdf")
  })
  
}