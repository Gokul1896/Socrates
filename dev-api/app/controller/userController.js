/** The controllers for registration and login API are written here */

const user = require("../model/userModel"),
  jwt = require("jsonwebtoken");
var crypto = require("crypto");


exports.userLogin = function(req, res, next) {
  user.findOne(
    { $and: [{ userName: req.body.userName }, { password: req.body.password }] },
    function(err, user) {
      if (!user)
        return res.status(401).send({
          msg:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

    
      res.send({ user: user.toJSON() });
    }
  );
};


exports.register = function(req, res, next) {
  
  user.findOne({ userName: req.body.userName }, function(err, userdata) {
    
    if (userdata)
      return res
        .status(400)
        .send({
          msg:
            "The email address you have entered is already associated with another account.",
        });
    var userObj = new user({
      fullName: req.body.fullName,
      userName: req.body.userName,
      institute: req.body.institute,
      password: req.body.password,
      role:req.body.role,
      specialization:req.body.specialization,
      created_at: new Date(),
    });
    userObj.save(function(err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      else{
        return res.status(200).send({success:true})
      }
      
      
    });
  });
};



