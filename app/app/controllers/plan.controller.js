const constant_config = require('../config/constant.config.js');
const moment = require('moment');
const db = require('../models');
const config = require('../config/auth.config');
var bcrypt = require('bcryptjs');
const User = db.user;
const Contract = db.contract;
const Contract_pdf = db.contract_pdf;
const Contract_percent = db.contract_percent;
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
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};
exports.delete = (req, res) => {
    Contract.destroy(
        { where: { id: req.body.id } }
    )
        .then(user => {
            Contract_pdf.destroy(
                { where: { contract_id: req.body.id } }
            );
            Contract_percent.destroy(
                { where: { contract_id: req.body.id } }
            );
            return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
        })
        .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
        });
};
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
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};
exports.set_approve = (req, res) => {
    Contract.update(
        { status: 'processando' },
        { where: { id: req.body.id, status: 'pendente' } }
    )
        .then(user => {
            return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
        })
        .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
        });
};
exports.all_by_user = (req, res) => {
    Contract.findAll({
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
            res.status(200).send(datas);
        })
        .catch(err => {
            res.status(500).send([]);
        });
};
exports.add_plan_admin = (req, res) => {
    let now = moment();
    if(req.body.investment_type === 'FLEXIVEL') {
        Contract.count({where: {user_id: req.body.user_id, invest_type: 'FLEXIVEL'}}).then(count => {
            if(count == 0 ) {
                Contract.create(
                    {
                        user_id: req.body.user_id,
                        open_value: req.body.open_value,
                        invest_type: req.body.investment_type,
                        start_date: now.format('YYYY-MM-DD'),
                        status: 'processando',
                        percent: req.body.percent,
                        end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
                    }
                )
                    .then(res_data => {
                        if (req.body.investment_type === 'FLEXIVEL') {
                            let contract_pdf_create = {
                                user_id: req.body.user_id,
                                invest_type: req.body.investment_type
                            };
                            Contract_pdf.create(contract_pdf_create);
                        } else if (req.body.investment_type === 'CRESCIMENTO') {
                            Contract_percent.create({
                                contract_id: res_data.id,
                                percent: req.body.percent
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
            }else if(count > 0) {
                return res.status(200).send({
                    status: 'fail',
                    message: 'User already have flexible plan running'
                });
            }
        })
    }else {
        Contract.create(
            {
                user_id: req.body.user_id,
                open_value: req.body.open_value,
                invest_type: req.body.investment_type,
                start_date: now.format('YYYY-MM-DD'),
                status: 'processando',
                percent: req.body.percent,
                end_date: req.body.investment_type === 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
            }
        )
            .then(res_data => {
                if (req.body.investment_type === 'FLEXIVEL') {
                    let contract_pdf_create = {
                        user_id: req.body.user_id,
                        invest_type: req.body.investment_type
                    };
                    Contract_pdf.create(contract_pdf_create);
                } else if (req.body.investment_type === 'CRESCIMENTO') {
                    Contract_percent.create({
                        contract_id: res_data.id,
                        percent: req.body.percent
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
    }

}
exports.add_plan = (req, res) => {
    let now = moment();
    Contract.create(
        {
            user_id: req.userId,
            open_value: req.body.open_value,
            invest_type: req.body.investment_type,
            start_date: now.format('YYYY-MM-DD'),
            status: 'processando',
            percent: req.body.investment_type === 'FLEXIVEL' ? constant_config.FLEX_DEFAULT_PERCENT: constant_config.CRESC_DEFAULT_PERCENT,
            end_date: req.body.investment_type == 'FLEXIVEL' ? moment(now.format('YYYY-MM-DD')).add(1, 'M') : moment(now.format('YYYY-MM-DD')).add(8, 'M')
        }
    )
        .then(res_data => {
            Contract_percent.create({
                contract_id: res_data.id,
                percent: constant_config.CRESC_DEFAULT_PERCENT
            });
            Case.decrement(
                { balance: req.body.open_value },
                { where: { user_id: req.userId } }
            );
            return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
        })
        .catch(err => {
            return res.status(500).send({ status: 'fail', message: err.message });
        });
};

exports.plan_percent_all = (req, res) => {
    Contract_percent.findAll({
        include: [
            {
                model: Contract
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
exports.plan_percent_all_by_contract = (req, res) => {
    Contract_percent.findAll({
        include: [
            {
                model: Contract
            }
        ],
        where: {
            contract_id: req.body.contract_id
        }
    })
    .then(datas => {
        res.status(200).send(datas);
    })
    .catch(err => {
        res.status(500).send([]);
    });
};
exports.plan_percent_add = (req, res) => {
    let now = moment();
    Contract.update(
        {
            percent: req.body.percent
        },
        {
            where: { id: req.body.contract_id }
        }).then((updated_data) => {
            if(req.body.investment_type === 'CRESCIMENTO') {
                Contract_percent.create(
                    {
                        contract_id: req.body.contract_id,
                        percent: req.body.percent
                    }
                )
                    .then(res_data => {
                        return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
                    })
                    .catch(err => {
                        return res.status(500).send({ status: 'fail', message: err.message });
                    });
            }else {
                return res.status(200).send({ status: 'success', message: 'Ação realizada com sucesso!' });
            }
    });

};

