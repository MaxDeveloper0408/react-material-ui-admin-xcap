module.exports = (sequelize, Sequelize) => {
    const Case_contract_history = sequelize.define('contract_histories', {
        contract_id: {
            type: Sequelize.INTEGER
        },
        action_type: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.DECIMAL
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        invest_type: {
            type: Sequelize.ENUM,
            values: ['FLEXIVEL', 'CRESCIMENTO']
        }
    });
    return Case_contract_history;
};
