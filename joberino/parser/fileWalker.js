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

		      var App = Parser();
		      var read = App.parse(content);
		      console.log(read.getDOB());
		      console.log(read.getName());

		      //Joberino.onDrop(read);
		    // Invoke the next step here however you like
		    console.log(content);   // Put all of the code here (not the best solution)
		    //processFile();          // Or put the next step in a function and invoke it
		});
	  }
    return {
      walk:walk
    };
  }


  return FileWalker;

});