var express = require('express');
var router = express.Router();
	
router.get('/', function(req,res) {
  if (req.session.userID){
    var db = req.db;
    var freets = db.get('freets');
    freets.find({"user":req.session.userID},{},function(e,docs){
    	res.render('uindex', {"user": req.session.userID, "freets" : docs})
    })    
  }
  else{
  	res.location('/');
  	res.redirect('/');
  }
})
/* GET users listing. */
router.get('/signup', function(req, res) {
  if (req.session.userID){	
    res.redirect('/');
  }
  else {
  	res.render('signup');
  }
});

router.get('/login', function(req, res) {
  if (req.session.userID){	
    res.redirect('/');
  }
  else {
  	res.render('login');
  }
});

router.post('/login', function(req, res){
  var db = req.db;
  var name = req.body.name;
  var password = req.body.password;
  var users = db.get('users');
  
  users.findOne({"name": name}, function(err, doc) {
    if (doc !== null && doc.password === password) {
      req.session.userID = name;
      res.location('/users');
      res.redirect('/users');
    }
    else {
      res.location('/user/login');
      res.render('login', {'emsg':"Incorrect Username or Password"});
    }
  });
});
router.get('/logout', function(req, res) {
  req.session.userID = undefined;
  res.location('/');
  res.redirect('/');
});

router.post('/freet', function(req, res) {
  var db = req.db;
  var freets = db.get('freets');
  var freet = req.body.freet;
  if (freet !== '') {
    freets.insert({"date": Date(), "user":req.session.userID, "freet": freet})
  }
  res.location('/users');
  res.redirect('/users');
});

router.get('/edit/:id', function(req, res) {
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
  
router.post('/edit', function(req, res) {
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

router.get('/delete/:id', function(req, res) {
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
      //if (confirm('Are you sure you want to delete into the database?')) {
        freets.remove({"_id":doc._id.toString()});
      //} 
      res.location('/users');
      res.redirect('/users');
    }
  })
})
//makes new user 
router.post('/', function(req, res) {
  var db = req.db;
  var name = req.body.name;
  var password = req.body.password;
  var users = db.get('users');

  users.findOne({"name":name}, function(err, doc) {
  	if (doc !== null) {
  	  res.location('/users/signup');
      res.render('signup', {'emsg':"Username already exists"});
  	}
  	else if (password === "" || name === "") {
  	  res.location('/users/signup');
      res.render('signup', {'emsg':"Need both username and password"});
  	}
  	else {
	  users.insert({
	        "name" : name,
	        "password" : password
	    }, function (err, doc) {
	        if (err) {
	            // If it failed, return error
	            res.send("There was a problem adding the information to the database.");
	        }
	        else {
	            // If it worked, set the header so the address bar doesn't still say /adduser
              req.session.userID = name;

	            res.location("/users");
	            // And forward to success page
	            res.redirect("/users");
	        }
	  });
  	}
  });

});
module.exports = router;
