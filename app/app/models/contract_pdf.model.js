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
      },
      admin_pdf2: {
        type: Sequelize.STRING
      },
      user_pdf2: {
        type: Sequelize.STRING
      },
      invest_type: {
        type:   Sequelize.ENUM,
        values: ['FLEXIVEL', 'CRESCIMENTO']
      }
    });
    return Contract_pdf;
  };
