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

exports.setActive = (req, res) => {
    User.update( 
        {active: req.body.active},
        {where: {id: req.body.id}}
    )
    .then(user => {
        return res.status(200).send({ status:'success', message: "Performed Succesfully!" });
    })
    .catch(err => {
        return res.status(500).send({ status:'fail', message: err.message });
    });
}