var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  //console.log(req.session.userID);	
  var DB_ID = req.params.id;
  var currentUser = req.session.userID;
  var db = req.db;
  var freets = db.get('freets');
  freets.findOne({"_id": DB_ID}, {}, function(e, doc) {
    if (doc === null) {
      res.location('/users');
      res.redirect('/users');
    }
    else if (doc.user !== currentUser) {
      res.location('/users');
      res.redirect('/users');
    }
    else {
      res.render('edit',{"prefreet": doc.freet, "id": DB_ID})
    }
  })

});
  
router.post('/', function(req, res) {
  var edittedFreet = req.body.edittedFreet;
  var DB_ID = req.body.id;
  var currentUser = req.session.userID;
  var db = req.db;
  var freets = db.get('freets');
  freets.findOne({"_id": DB_ID}, {}, function(e, doc) {
    if (doc === null) {
      res.location('/users');
      res.redirect('/users');
    }
    else if (doc.user !== currentUser) {
      res.location('/users');
      res.redirect('/users');
    }
    else {
      freets.updateById(doc._id.toString(), {"user": currentUser, "freet": edittedFreet, "date": Date()});
      res.location('/users');
      res.redirect('/users');
    }
  })
})
//find index of view and set title to Express
module.exports = router;
