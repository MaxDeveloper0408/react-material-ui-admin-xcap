module.exports = (sequelize, Sequelize) => {
    const Withdraw_history = sequelize.define("withdraw_history", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      withdraw_value: {
        type: Sequelize.DECIMAL
      },
      remain_value: {
        type: Sequelize.DECIMAL
      },
      status: {
          type:   Sequelize.STRING
      },
    });
    return Withdraw_history;
  };
