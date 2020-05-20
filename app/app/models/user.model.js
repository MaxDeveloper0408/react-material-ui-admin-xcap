module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      full_name: {
        type: Sequelize.STRING
      },
      investment_type: {
        type:   Sequelize.ENUM,
        values: ['FLEXIVEL', 'CRESCIMENTO']
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['MASCULINO', 'FEMININO', 'TRANSGÊNERO', 'OTHER']
      },
      cpf: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.INTEGER
      },  
      street: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      complement: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      investment: {
        type: Sequelize.ENUM,
        values: ['5.000-10.000', '5.000-15.000', '20.000-50.000', '100.000+']
      },
      password: {
        type: Sequelize.STRING
      },
      admin: {
        type: Sequelize.ENUM,
        values: ['0', '1']
      },
      first_access: {
        type: Sequelize.ENUM,
        values: ['0', '1']
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      client_type: {
        type: Sequelize.ENUM,
        values: ['CLIENTE', 'ESPECIAL', 'DEMO', 'ADMIN']
      },
      active: {
        type: Sequelize.ENUM,
        values: ['YES', 'NO']
      }
    });
    return User;
  };