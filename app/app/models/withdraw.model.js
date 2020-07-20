module.exports = (sequelize, Sequelize) => {
    const Withdraw_history = sequelize.define("withdraws", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DECIMAL
      },
      case_value: {
        type: Sequelize.DECIMAL
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['pending','approved','canceled']
      },
    });
    return Withdraw_history;
  };
