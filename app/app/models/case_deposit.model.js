module.exports = (sequelize, Sequelize) => {
    const Case_deposit = sequelize.define("case_desposits", {
      admin_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      case_amount: {
        type: Sequelize.DECIMAL
      },
    });
    return Case_deposit;
  };
