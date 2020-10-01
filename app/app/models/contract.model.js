module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define('contracts', {
        user_id: {
            type: Sequelize.INTEGER
        },
        created_id: {
            type: Sequelize.INTEGER
        },
        invest_type: {
            type: Sequelize.ENUM,
            values: ['FLEXIVEL', 'CRESCIMENTO']
        },
        profit_value: {
            type: Sequelize.DECIMAL
        },
        open_value: {
            type: Sequelize.DECIMAL
        },
        percent: {
            type: Sequelize.DECIMAL
        },
        start_date: {
            type: Sequelize.DATEONLY
        },
        end_date: {
            type: Sequelize.DATEONLY
        },
        status: {
            type: Sequelize.ENUM,
            values: ['pendente', 'processando', 'concluído']
        }
    });
    return Contract;
};
