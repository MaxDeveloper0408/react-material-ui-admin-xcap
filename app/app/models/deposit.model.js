module.exports = (sequelize, Sequelize) => {
    const Deposit = sequelize.define("deposits", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      invest_type: {
          type:   Sequelize.ENUM,
          values: ['FLEXIVEL', 'CRESCIMENTO']
      },
      user_value: {
        type: Sequelize.DECIMAL
      },
      admin_value: {
        type: Sequelize.DECIMAL
      },
      status: {
          type:   Sequelize.ENUM,
          values: ['pending','approved']
      },
    });
    return Deposit;
  };
