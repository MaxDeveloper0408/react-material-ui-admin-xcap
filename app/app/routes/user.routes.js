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
  app.get("/api/user/deactiveall",[authJwt.verifyToken, authJwt.isAdmin],controller.userDeactiveAll);
  app.get("/api/user/activeall",[authJwt.verifyToken, authJwt.isAdmin],controller.userActiveAll);
  app.post("/api/user/one",[authJwt.verifyToken],controller.userOne);
  app.post("/api/user/update", [authJwt.verifyToken], controller.update);
  app.post("/api/user/updatePassword", [authJwt.verifyToken], controller.updatePassword);
  app.post("/api/user/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  app.post("/api/user/setActive", [authJwt.verifyToken, authJwt.isAdmin], controller.setActive);

  app.post("/api/user/bank",[authJwt.verifyToken],controller.userBank);
  app.post("/api/user/bankUpdate", [authJwt.verifyToken], controller.bankUpdate);
  app.post("/api/user/getBalance", [authJwt.verifyToken], controller.getBalance);
};
