define([], function(){ 
  var Application = function(){
  
	this.fields = ["Name", "DOB", "Resume"];
	
	/*
	function getFields(){ return fields; }
	var funcs = {};
	for(var i = 0, len = fields.length; i < len; i++){
		this[fields[i]] = "";
		funcs['get'+fields[i]] = function(){ return fields[i]; };
	}
	*/
	
    this.Name = "";
    this.DOB = "";
    this.Resume = "";

    function getName(){ return this.Name; }
    function getDOB(){ return this.DOB; }
    function getResume(){ return this.Resume; }
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
