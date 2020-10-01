module.exports = (sequelize, Sequelize) => {
    const Contract_percent = sequelize.define("contract_percents", {
      contract_id: {
        type: Sequelize.INTEGER,
      },
      percent: {
        type: Sequelize.DECIMAL
      },
    });
    return Contract_percent;
  };
