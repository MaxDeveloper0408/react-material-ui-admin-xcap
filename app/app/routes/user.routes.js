const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all",[authJwt.verifyToken, authJwt.isAdmin],controller.userAll);
  app.get("/api/user/adminall",[authJwt.verifyToken, authJwt.isAdmin],controller.adminAll);
  app.get("/api/user/deactiveall",[authJwt.verifyToken, authJwt.isAdmin],controller.userDeactiveAll);
  app.get("/api/user/activeall",[authJwt.verifyToken, authJwt.isAdmin],controller.userActiveAll);
  app.post("/api/user/one",[authJwt.verifyToken],controller.userOne);
  app.post("/api/user/update", [authJwt.verifyToken], controller.update);
  app.post("/api/user/updatePassword", [authJwt.verifyToken], controller.updatePassword);
  app.post("/api/user/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  app.post("/api/user/setActive", [authJwt.verifyToken, authJwt.isAdmin], controller.setActive);
  app.post("/api/user/setProfit", [authJwt.verifyToken, authJwt.isAdmin], controller.setProfit);
  app.get("/api/user/all_case_deposit", [authJwt.verifyToken, authJwt.isAdmin], controller.all_case_deposit);
  app.post("/api/user/add_fund", [authJwt.verifyToken, authJwt.isAdmin], controller.add_fund);
  app.post("/api/user/getPlanSum", [authJwt.verifyToken, authJwt.isAdmin], controller.getPlanSum);
  app.post("/api/user/admin_deposit_to_user", [authJwt.verifyToken, authJwt.isAdmin], controller.admin_deposit_to_user);
  app.post("/api/user/admin_create", [authJwt.verifyToken, authJwt.isAdmin], controller.admin_create);

  
  app.post("/api/user/withdraw_sum_pending", [authJwt.verifyToken, authJwt.isAdmin], controller.withdraw_sum_pending);
  app.post("/api/user/withdraw_sum_paid", [authJwt.verifyToken, authJwt.isAdmin], controller.withdraw_sum_paid);
  app.post("/api/user/active_users_count", [authJwt.verifyToken, authJwt.isAdmin], controller.active_users_count);
  app.post("/api/user/plan_numbers_this_month", [authJwt.verifyToken, authJwt.isAdmin], controller.plan_numbers_this_month);
  app.post("/api/user/cresc_plan_total", [authJwt.verifyToken, authJwt.isAdmin], controller.cresc_plan_total);

  

  app.post("/api/user/bank",[authJwt.verifyToken],controller.userBank);
  app.post("/api/user/bankUpdate", [authJwt.verifyToken], controller.bankUpdate);
  app.post("/api/user/getBalance", [authJwt.verifyToken], controller.getBalance);

  app.post("/api/user/contract_all",[authJwt.verifyToken, authJwt.isAdmin],controller.contract_all);
  app.post("/api/user/contract_by_user",[authJwt.verifyToken],controller.contract_by_user);
  app.post("/api/user/uploadAdminContract",[authJwt.verifyToken, authJwt.isAdmin],controller.admin_upload_contract);
  app.post("/api/user/download_contract", [authJwt.verifyToken], controller.download_contract);

  app.post("/api/user/uploadUserContract",[authJwt.verifyToken],controller.user_upload_contract);
  app.post("/api/user/download_user_contract", [authJwt.verifyToken], controller.download_user_contract);
  app.post("/api/user/download_user_contract_by_cp", [authJwt.verifyToken], controller.download_user_contract_by_cp);
  app.post("/api/user/check_cpf_user", [authJwt.verifyToken], controller.check_cpf_user);

  app.post("/api/user/bank_all", [authJwt.verifyToken], controller.bank_all);
  app.post("/api/user/getPlanSumByUser", [authJwt.verifyToken], controller.getPlanSumByUser);
  app.post("/api/user/getPlanExpDateByUser", [authJwt.verifyToken], controller.getPlanExpDateByUser);
  app.post("/api/user/getExpiredProfitSumByUser", [authJwt.verifyToken], controller.getExpiredProfitSumByUser);

};
