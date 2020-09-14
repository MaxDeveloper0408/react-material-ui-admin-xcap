const moment = require('moment');
const db = require("../models");
const User = db.user;
const Contract = db.contract;
const Deposit = db.deposit;
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

exports.all = (req, res) => {
  Deposit.findAll({
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

exports.set_approve = (req, res) => {
  let upload = multer({ storage: storage,limits:{fileSize:'10mb'}, fileFilter: multerHelper.pdfFilter}).single('admin_pdf');
  upload(req, res, function(err) {
    if (req.body.investment_type === 'CRESCIMENTO') {
      if (req.fileValidationError) {
        return res.status(200).send({ status: 'fail', message: req.fileValidationError });
      } else if (!req.file) {
        Deposit.update(
          { status: 'concluído', admin_value: req.body.admin_value },
          { where: { id: req.body.id, status: 'pendente' } }
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
                end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
              }
            )
              .then(res_data => {
                return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
              })
              .catch(err => {
                return res.status(500).send({ status: 'fail', message: err.message });
              });
            return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
          })
          .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
          });
      } else if (err instanceof multer.MulterError) {
        return res.status(200).send({ status: 'fail', message: err });
      } else if (err) {
        return res.status(200).send({ status: 'fail', message: err });
      } else if (req.file) {
        Deposit.update(
          { status: 'concluído', admin_value: req.body.admin_value },
          { where: { id: req.body.id, status: 'pendente' } }
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
                end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
              }
            )
              .then(res_data => {
                if (req.body.investment_type === "CRESCIMENTO") {
                  let contract_pdf_create = {
                    user_id: req.body.user_id,
                    admin_pdf: req.file.path,
                    invest_type: req.body.investment_type,
                  }
                  if (req.body.investment_type === 'FLEXIVEL') {
                    contract_pdf_create = {
                      user_id: req.body.user_id,
                      admin_pdf: req.file.path,
                      invest_type: req.body.investment_type,
                    }
                  } else if (req.body.investment_type === 'CRESCIMENTO') {
                    contract_pdf_create = {
                      user_id: req.body.user_id,
                      admin_pdf2: req.file.path,
                      invest_type: req.body.investment_type,
                      contract_id: res_data.id
                    }
                  }
                  Contract_pdf.create(contract_pdf_create)
                }
                return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
              })
              .catch(err => {
                return res.status(500).send({ status: 'fail', message: err.message });
              });
            return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
          })
          .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
          });
      }
    }else if (req.body.investment_type === 'FLEXIVEL') {
      Deposit.update(
        { status: 'concluído', admin_value: req.body.admin_value },
        { where: { id: req.body.id, status: 'pendente' } }
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
              end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format("YYYY-MM-DD")).add(1, 'M') : moment(now.format("YYYY-MM-DD")).add(8, 'M')
            }
          )
            .then(res_data => {
              return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
            })
            .catch(err => {
              return res.status(500).send({ status: 'fail', message: err.message });
            });
          return res.status(200).send({ status: 'success', message: "Ação realizada com sucesso!" });
        })
        .catch(err => {
          return res.status(500).send({ status: 'fail', message: err.message });
        });
    }
  })

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
