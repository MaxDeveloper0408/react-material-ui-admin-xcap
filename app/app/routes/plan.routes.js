const { authJwt } = require("../middleware");
const controller = require("../controllers/plan.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/plan/all",[authJwt.verifyToken, authJwt.isAdmin],controller.all);
  app.post("/api/plan/add_plan_admin",[authJwt.verifyToken, authJwt.isAdmin],controller.add_plan_admin);
  app.post("/api/plan/delete",[authJwt.verifyToken, authJwt.isAdmin],controller.delete);
  app.post("/api/plan/getAllByInvestType",[authJwt.verifyToken, authJwt.isAdmin],controller.getAllByInvestType);
  app.post("/api/plan/set_approve",[authJwt.verifyToken, authJwt.isAdmin],controller.set_approve);

  app.post("/api/plan/plan_percent_all",[authJwt.verifyToken, authJwt.isAdmin],controller.plan_percent_all);
  app.post("/api/plan/plan_percent_all_by_contract",[authJwt.verifyToken],controller.plan_percent_all_by_contract);
  app.post("/api/plan/plan_percent_add",[authJwt.verifyToken],controller.plan_percent_add);
  // app.post("/api/plan/one",[authJwt.verifyToken],controller.one);

  app.post("/api/plan/all_by_user",[authJwt.verifyToken],controller.all_by_user);
  app.post("/api/plan/all_by_user_it",[authJwt.verifyToken],controller.all_by_user_it);
  app.post("/api/plan/add_plan",[authJwt.verifyToken],controller.add_plan);


  

};
