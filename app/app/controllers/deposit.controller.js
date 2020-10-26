const constant_config = require('../config/constant.config');
const moment = require('moment');
const db = require('../models');
const User = db.user;
const Contract = db.contract;
const Deposit = db.deposit;
const Contract_pdf = db.contract_pdf;
const Contract_percent = db.contract_percent;
const Contract_history = db.contract_history;
const multer = require('multer');
const path = require('path');
const multerHelper = require('./multer.helper');
const storage = multer.diskStorage({
    destination: './public/uploads/',
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
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};

exports.set_approve = (req, res) => {
    let upload = multer({
        storage: storage,
        limits: { fileSize: '10mb' },
        fileFilter: multerHelper.pdfFilter
    }).single('admin_pdf');
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
                                start_date: now.format('YYYY-MM-DD'),
                                status: 'processando',
                                percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
                                end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
                            }
                        )
                            .then(res_data => {
                                Contract_history.create(
                                    {
                                        user_id: res_data.user_id,
                                        value: res_data.open_value,
                                        contract_id: res_data.id,
                                        action_type: 0,
                                        invest_type: res_data.invest_type
                                    }
                                )
                                if (req.body.investment_type === 'FLEXIVEL') {
                                    let contract_pdf_create = {
                                        user_id: req.body.user_id,
                                        invest_type: req.body.investment_type
                                    };
                                    Contract_pdf.create(contract_pdf_create);
                                } else if (req.body.investment_type === 'CRESCIMENTO') {
                                    Contract_percent.create({
                                        contract_id: res_data.id,
                                        percent: constant_config.CRESC_DEFAULT_PERCENT
                                    });
                                    let contract_pdf_create = {
                                        user_id: req.body.user_id,
                                        invest_type: req.body.investment_type,
                                        contract_id: res_data.id
                                    };
                                    Contract_pdf.create(contract_pdf_create);
                                }
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'Ação realizada com sucesso!'
                                });
                            })
                            .catch(err => {
                                return res.status(500).send({ status: 'fail', message: err.message });
                            });
                        return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
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
                                start_date: now.format('YYYY-MM-DD'),
                                status: 'processando',
                                percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
                                end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
                            }
                        )
                            .then(res_data => {
                                Contract_history.create(
                                    {
                                        user_id: res_data.user_id,
                                        value: res_data.open_value,
                                        contract_id: res_data.id,
                                        action_type: 0,
                                        invest_type: res_data.invest_type
                                    }
                                );
                                if (req.body.investment_type === 'CRESCIMENTO') {
                                    Contract_percent.create({
                                        contract_id: res_data.id,
                                        percent: constant_config.CRESC_DEFAULT_PERCENT
                                    });
                                    let contract_pdf_create = {
                                        user_id: req.body.user_id,
                                        admin_pdf2: req.file.path,
                                        invest_type: req.body.investment_type,
                                        contract_id: res_data.id
                                    };
                                    Contract_pdf.create(contract_pdf_create);
                                }
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'Ação realizada com sucesso!'
                                });
                            })
                            .catch(err => {
                                return res.status(500).send({ status: 'fail', message: err.message });
                            });
                        return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
                    })
                    .catch(err => {
                        return res.status(500).send({ status: 'fail', message: err.message });
                    });
            }
        } else if (req.body.investment_type === 'FLEXIVEL') {
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
                            start_date: now.format('YYYY-MM-DD'),
                            status: 'processando',
                            percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
                            end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
                        }
                    )
                        .then(res_data => {
                            Contract_history.create(
                                {
                                    user_id: res_data.user_id,
                                    value: res_data.open_value,
                                    contract_id: res_data.id,
                                    action_type: 0,
                                    invest_type: res_data.invest_type
                                }
                            )
                            return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
                        })
                        .catch(err => {
                            return res.status(500).send({ status: 'fail', message: err.message });
                        });
                    // return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
                })
                .catch(err => {
                    return res.status(500).send({ status: 'fail', message: err.message });
                });
        }
    });

};
exports.all_by_user = (req, res) => {
    Deposit.findAll({
        where: {
            user_id: req.body.user_id
        }
    })
        .then(datas => {
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};
exports.get_deposit = (req, res) => {
    Deposit.findAll({
        where: req.body
    })
        .then(datas => {
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};

exports.add = (req, res) => {
    Deposit.create(
        {
            user_id: req.userId,
            user_value: req.body.user_value,
            invest_type: req.body.investment_type,
            status: 'pendente'
        }
    )
        .then(res_data => {
            return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
        })
        .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
        });
};
