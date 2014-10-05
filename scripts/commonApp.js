require(["parser/parser"], function(Parser){
  var App = Parser();
  read = App.parse("asdfasdf Name Eric \n Wang \n DOB 12 \n Resume 1234");
  console.log(read.getName());
});
