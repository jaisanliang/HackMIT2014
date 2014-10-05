require(['Applicant'], function(Applicant){
  var Parser = {
	parse: function(myText){
	  $(document).ready(function(){
		//var field_names = ["NAME:", "ID:", "DOB:"];
	 
		var person = Applicant();
		
		var field_names = person.getFields();
		
		/*
		//start temp
		var person = new Object;
		for(var i = 0, len = field_names; i < len; i++){
		  person[field_names[i]] = "";
		}
		//end temp
		*/

		//var myText = "asdfasdfasdf Name:Eric \n Wang \n DOB:12 \n Resume: 1234";

		var lines = myText.split("\n"), tempVar;

		j = 0
		current_name = "";
		for(var i = 0, len = lines.length; i < len; i++){
		  tempVar = lines[i].indexOf(field_names[j]);
		  if(tempVar !== -1){
			person[field_names[j]] = lines[i].substring(tempVar+field_names[j].length);
			current_name = field_names[j];
			j += 1;
		  }
		  else if(current_name !== ""){
			person[field_names[j-1]] += " " + lines[i];
		  }	
		}
		
		var tempStr = "";
		
		return person;
		});
	}
	}
}); 
