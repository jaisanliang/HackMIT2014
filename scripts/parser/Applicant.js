define([], function(){ 
  var Application = function(){
	this.fields = ["Name:", "DOB:", "Resume:"];
    this.name = "";
    this.DOB = "";
    this.resume = ""; 

    function getName(){ return name; }
    function getDOB(){ return DOB; }
    function getResume(){ return resume; }
	function getFields(){ return fields; }
    
    return {
      getName: getName,
      getDOB: getDOB,
      getResume: getResume,
	  getFields: getFields
    };
  };

  return Application;
});
