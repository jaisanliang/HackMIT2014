define([], function(){ 
  var Application = function(){
  
	this.fields = ["Name", "DOB", "Resume"];
	
	var funcs = {}; //dict of get methods
	funcs["getFields"] = function(){ return fields; }
	
	for(var i = 0, len = fields.length; i < len; i++){
		this[fields[i]] = "yup";
		var temp = this[fields[i]];
		funcs["get"+this.fields[i]] = function(i){
			return function(){ return this[fields[i]]}; 
		}(i);
	}
		
	/* old hardcode solution
    this.Name = "";
    this.DOB = "";
    this.Resume = "";

    function getName(){ return this.Name; }
    function getDOB(){ return this.DOB; }
    function getResume(){ return this.Resume; }
	function getFields(){ return fields; }
    */
	
	var r = {}; //thing to return
	
	r["getFields"] = funcs["getFields"];
	
	for(var i = 0, len = fields.length; i < len; i++){
		r["get"+this.fields[i]] = funcs["get"+this.fields[i]];	
	}
	
	return r
	
	/* old hardcode return
    return {
      getName: funcs["getName"],
      getDOB: funcs["getDOB"],
      getResume: funcs["getResume"],
	  getFields: funcs["getFields"]
    };
	*/
  };
  
  return Application;
});
