module.exports = (sequelize, Sequelize) => {
    const Withdraw_history = sequelize.define("withdraws", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DECIMAL
      },
      cpf: {
        type: Sequelize.STRING
      },
      case_value: {
        type: Sequelize.DECIMAL
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['pendente','aprovado','cancelado']
      },
    });
    return Withdraw_history;
  };
