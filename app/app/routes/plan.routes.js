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

  // app.get("/api/plan/all",[authJwt.verifyToken, authJwt.isAdmin],controller.all);
  // app.post("/api/plan/one",[authJwt.verifyToken],controller.one);

  app.post("/api/plan/all_by_user",[authJwt.verifyToken],controller.all_by_user);

};
