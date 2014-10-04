
$(document).ready(function(){
	
	var fields = ["Name:", "ID:"];

	var myText = "Name:Eric \n ID:1234";

	var lines = myText.split("\n"),
		dates = [], tempVar;

	for(var i = 0, len = lines.length; i < len; i++){
		tempVar = lines[i].indexOf(fields)
		if(tempVar !== -1){
			dates.push(lines[i].substring(tempVar+fields.length));
		}
	}
	
	document.getElementById("edit").innerHTML = dates;
});
	