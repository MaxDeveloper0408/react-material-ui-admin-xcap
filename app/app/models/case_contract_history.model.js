module.exports = (sequelize, Sequelize) => {
    const Case_contract_history = sequelize.define('case_contract_histories', {
        contract_id: {
            type: Sequelize.INTEGER
        },
        case_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        add_balance: {
            type: Sequelize.DECIMAL
        }
    });
    return Case_contract_history;
};
