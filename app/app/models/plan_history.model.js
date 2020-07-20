module.exports = (sequelize, Sequelize) => {
    const Plan_history = sequelize.define("plan_history", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      invest_type: {
          type:   Sequelize.STRING
      },
      open_value: {
        type: Sequelize.DECIMAL
      },
      case_value: {
        type: Sequelize.DECIMAL
      },
      profit_value: {
        type: Sequelize.DECIMAL
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      status: {
          type:   Sequelize.STRING
      },
    });
    return Plan_history;
  };
