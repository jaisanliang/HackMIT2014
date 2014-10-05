var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //console.log(req.session.userID);	
  res.render('dnd');

});
  
//find index of view and set title to Express
module.exports = router;
