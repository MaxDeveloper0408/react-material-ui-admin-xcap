const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.bank = require("../models/bank.model.js")(sequelize, Sequelize);
db.bank_list = require("../models/bank_list.model.js")(sequelize, Sequelize);
db.case = require("../models/case.model.js")(sequelize, Sequelize);
db.case_deposit = require("../models/case_deposit.model.js")(sequelize, Sequelize);
db.case_contract_history = require("../models/case_contract_history.model.js")(sequelize, Sequelize);
db.contract = require("../models/contract.model.js")(sequelize, Sequelize);
db.contract_percent = require("../models/contract_percent.model.js")(sequelize, Sequelize);
db.contract_pdf = require("../models/contract_pdf.model.js")(sequelize, Sequelize);
db.deposit = require("../models/deposit.model.js")(sequelize, Sequelize);
db.plan_history = require("../models/plan_history.model.js")(sequelize, Sequelize);
db.withdraw = require("../models/withdraw.model.js")(sequelize, Sequelize);
db.contract_history = require("../models/contract_history.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.contract.belongsToMany(db.deposit, {
  through: "deposit_contracts",
  foreignKey: "contract_id",
  otherKey: "deposit_id"
});
db.deposit.belongsToMany(db.contract, {
  through: "deposit_contracts",
  foreignKey: "deposit_id",
  otherKey: "contract_id"
});

db.user.hasMany(db.contract, {foreignKey: 'user_id'})
db.contract.belongsTo(db.user, {foreignKey: 'user_id'})

db.user.hasMany(db.deposit, {foreignKey: 'user_id'})
db.deposit.belongsTo(db.user, {foreignKey: 'user_id'})

db.user.hasMany(db.withdraw, {foreignKey: 'user_id'})
db.withdraw.belongsTo(db.user, {foreignKey: 'user_id'})

db.user.hasMany(db.case_deposit, {foreignKey: 'user_id'})
db.case_deposit.belongsTo(db.user, {foreignKey: 'user_id'})

db.user.hasOne(db.case, {foreignKey: 'user_id'})
db.case.belongsTo(db.user, {foreignKey: 'user_id'})

db.user.hasMany(db.contract_pdf, {foreignKey: 'user_id'})
db.contract_pdf.belongsTo(db.user, {foreignKey: 'user_id'})

db.contract.hasOne(db.contract_pdf, {foreignKey: 'contract_id'})
db.contract_pdf.belongsTo(db.contract, {foreignKey: 'contract_id'})

db.contract.hasMany(db.contract_percent, {foreignKey: 'contract_id'})
db.contract_percent.belongsTo(db.contract, {foreignKey: 'contract_id'})

db.bank_list.hasMany(db.bank, {foreignKey: 'bank_id'})
db.bank.belongsTo(db.bank_list, {foreignKey: 'bank_id'})

db.user.hasOne(db.bank, {foreignKey: 'user_id'})
db.bank.belongsTo(db.user, {foreignKey: 'user_id'})


db.ROLES = ["user", "admin"];

module.exports = db;
