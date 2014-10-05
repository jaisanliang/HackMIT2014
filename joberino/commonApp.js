var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    baseUrl: 'parser',
    nodeRequire: require
});

requirejs(["parser"], function(Parser){
  var App = Parser();
  read = App.parse("asdfasdf Name Eric \n Wang \n DOB 12 \n Resume 1234");
  console.log(read.getDOB());
  console.log(read.getName());
});
