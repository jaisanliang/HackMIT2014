var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //console.log(req.session.userID);	
  var db = req.db;
  var freets = db.get('freets');
  if (req.session.userID){
    freets.find({},{"date":-1},function(e, docs){
    	res.render('index', {"freets" : docs, "home": true, "logout": true})
    })
  }
  else {
    freets.find({},{"date":-1},function(e, docs){
    	res.render('index', {"freets" : docs, "login": true, "signup": true})
    })
  }
});
  
//find index of view and set title to Express
module.exports = router;
