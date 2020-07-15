module.exports = (sequelize, Sequelize) => {
    const Case = sequelize.define("cases", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      balance: {
        type: Sequelize.DECIMAL
      },
    });
    return Case;
  };
