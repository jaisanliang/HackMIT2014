require(["parser/parser", "../joberino/public/javascripts/dragDrop"], function(Parser, initiateDropzone){
  $('document').ready(function(){
	var App = Parser();
	initiateDropzone();
	read = App.parse();
	console.log(read.getResume());
  });
});
