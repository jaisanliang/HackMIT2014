define(['Applicant'], function(Applicant){
  var Parser = function() {
    // Takes in text of textfile and returns parsed version: Applicant
    function parse(myText){
      var person = Applicant();
      console.log('parse');
      var field_names = person.getFields();

      var lines = myText.split("\n"), tempVar;

      j = 0;
      current_name = "";
      //console.log(lines.length);
      for(var i = 0, len = lines.length; i < len; i++){
        var field_start = lines[i].indexOf(field_names[j]);
        if(field_start !== -1){
          person[field_names[j]] = lines[i].substring(field_start + field_names[j].length);
          //console.log("test: " + lines[i].substring(field_start + field_names[j].length))
          current_name = field_names[j];
          //console.log("current_name: " + current_name);
          j += 1;
        }
        else if(current_name !== ""){
          person[field_names[j-1]] += " " + lines[i];
        }	
        //console.log("lines[i]: " + lines[i]);
      }      
      return person;
    }

    return {
      parse:parse
    };
  }; 

  return Parser;
});