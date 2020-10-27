const { authJwt } = require("../middleware");
const controller = require("../controllers/withdraw.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/withdraw/all",[authJwt.verifyToken, authJwt.isAdmin],controller.all);
  app.post("/api/withdraw/set_approve",[authJwt.verifyToken, authJwt.isAdmin],controller.set_approve);
  app.post("/api/withdraw/delete",[authJwt.verifyToken, authJwt.isAdmin],controller.delete);
  app.post("/api/withdraw/all_by_user",[authJwt.verifyToken],controller.all_by_user);
  app.post("/api/withdraw/add",[authJwt.verifyToken],controller.add);
  app.post("/api/withdraw/transfer",[authJwt.verifyToken],controller.transfer);
  app.post("/api/withdraw/get_withdraw",[authJwt.verifyToken],controller.get_withdraw);

};
