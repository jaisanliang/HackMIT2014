var fs = require('fs');

define(['parser'], function(Parser){ 
  var FileWalker = function() {

	var walk = function(dir, done) {
	  var results = [];
	  fs.readdir(dir, function(err, list) {
	    if (err) return done(err);
	    var pending = list.length;
	    if (!pending) return done(null, results);
	    list.forEach(function(file) {
	    	console.log("file: " + file);
	      file = dir + '/' + file;
	      fs.stat(file, function(err, stat) {
	        if (stat && stat.isDirectory()) {
	          walk(file, function(err, res) {
	            results = results.concat(res);
	            if (!--pending) done(null, results);
	          });
	        } else {
	          results.push(file);
	          //console.log(file);
	          getParsedData(file);


	          if (!--pending) done(null, results);
	        }
	      });
	    });
	  });
	};

	  var getParsedData = function(file) {

		fs.readFile(file, function read(err, data) {
		    if (err) {
		        throw err;
		    }
		    content = data.toString();
		    console.log(content);

		      var App = Parser();
		      var read = App.parse(content);
		      console.log("DOB: " + read.getDOB());
		      console.log("Name: " + read.getName());


		});
	  }
    return {
      walk:walk
    };
  }


  return FileWalker;

});