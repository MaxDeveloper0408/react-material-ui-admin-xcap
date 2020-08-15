module.exports = (sequelize, Sequelize) => {
    const Bank_list = sequelize.define("bank_lists", {
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
    });
    return Bank_list;
  };
