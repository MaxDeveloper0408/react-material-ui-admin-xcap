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
db.case = require("../models/case.model.js")(sequelize, Sequelize);
db.contract = require("../models/contract.model.js")(sequelize, Sequelize);
db.deposit = require("../models/deposit.model.js")(sequelize, Sequelize);
db.plan_history = require("../models/plan_history.model.js")(sequelize, Sequelize);
db.withdraw = require("../models/withdraw.model.js")(sequelize, Sequelize);


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

db.user.hasOne(db.case, {foreignKey: 'user_id'})
db.case.belongsTo(db.user, {foreignKey: 'user_id'})

console.log('model');
db.ROLES = ["user", "admin"];

module.exports = db;
