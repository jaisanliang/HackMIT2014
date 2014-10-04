var express = require('express');
var router = express.Router();

  
router.get('/:id', function(req, res) {
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
      if (confirm('Are you sure you want to delete into the database?')) {
        freets.remove({"_id":doc._id.toString()});
      } 
      res.location('/users');
      res.redirect('/users');
    }
  })
})
//find index of view and set title to Express
module.exports = router;
