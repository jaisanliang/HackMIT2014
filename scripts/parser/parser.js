define(['parser/Applicant'], function(Applicant){
  var Parser = function() {
    // Takes in text of textfile and returns parsed version: Applicant
    function parse(myText){
      var person = Applicant();
      
      var field_names = person.getFields();

      var lines = myText.split("\n"), tempVar;

      j = 0;
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
    }

    return {
      parse:parse
    };
  }; 

  return Parser;
});