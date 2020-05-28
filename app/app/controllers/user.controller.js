const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.userAll = (req, res) => {
    User.findAll({
        where: {
            admin: '0'
        }
    })
    .then(users => {
      res.status(200).send(users)
    })
    .catch(err => {
      res.status(500).send([])
    });
}
exports.userActiveAll = (req, res) => {
  User.findAll({
      where: {
          admin: '0',
          active: 'YES'
      }
  })
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send([])
  });
}
exports.userOne = (req, res) => {
  User.findOne({
      where: {
          id: req.body.id
      }
  })
  .then(user => {
    res.status(200).send(user)
  })
  .catch(err => {
    res.status(500).send({})
  });
}
exports.update = (req, res) => {
  let user = req.body;
  let id = req.body.id;
  delete user.id;
  delete user.updatedAt;
  User.update( 
      user,
      {where: {id: id}}
  )
  .then(user => {
      return res.status(200).send({ status:'success', message: "Performed Succesfully!" });
  })
  .catch(err => {
      return res.status(500).send({ status:'fail', message: err.message });
  });
}
exports.delete = (req, res) => {
  console.log(req.body)
    User.destroy( 
        {where: {id: req.body.id}}
    )
    .then(user => {
        return res.status(200).send({ status:'success', message: "Performed Succesfully!" });
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
}
exports.setActive = (req, res) => {
  console.log(req.body)
    User.update( 
        {
          active: req.body.active,
          investment: req.body.investment
        },
        {where: {id: req.body.id}}
    )
    .then(user => {
        return res.status(200).send({ status:'success', message: "Performed Succesfully!" });
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
}
