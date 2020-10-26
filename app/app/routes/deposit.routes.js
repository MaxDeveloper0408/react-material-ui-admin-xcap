const { authJwt } = require("../middleware");
const controller = require("../controllers/deposit.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/deposit/all",[authJwt.verifyToken, authJwt.isAdmin],controller.all);

  app.post("/api/deposit/set_approve",[authJwt.verifyToken, authJwt.isAdmin],controller.set_approve);

  app.post("/api/deposit/get_deposit",[authJwt.verifyToken],controller.get_deposit);
  app.post("/api/deposit/all_by_user",[authJwt.verifyToken],controller.all_by_user);
  app.post("/api/deposit/add",[authJwt.verifyToken],controller.add);
  

};
