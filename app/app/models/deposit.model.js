module.exports = (sequelize, Sequelize) => {
    const Deposit = sequelize.define('deposits', {
        user_id: {
            type: Sequelize.INTEGER
        },
        admin_id: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.INTEGER
        },
        percent: {
            type: Sequelize.DECIMAL
        },
        invest_type: {
            type: Sequelize.ENUM,
            values: ['FLEXIVEL', 'CRESCIMENTO']
        },
        user_value: {
            type: Sequelize.DECIMAL
        },
        admin_value: {
            type: Sequelize.DECIMAL
        },
        status: {
            type: Sequelize.ENUM,
            values: ['pendente', 'concluído']
        }

    });
    return Deposit;
};
