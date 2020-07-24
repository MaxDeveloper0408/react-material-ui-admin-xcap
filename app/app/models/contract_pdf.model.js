module.exports = (sequelize, Sequelize) => {
    const Contract_pdf = sequelize.define("contract_pdfs", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      admin_pdf: {
        type: Sequelize.STRING
      },
      user_pdf: {
        type: Sequelize.STRING
      }
    });
    return Contract_pdf;
  };
