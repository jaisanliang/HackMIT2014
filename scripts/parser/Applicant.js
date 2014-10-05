define([], function(){ 
  var Application = function(){
  
	this.fields = ["Name", "DOB", "Resume"]; //this could be passed in
	
	var funcs = {}; //dict of get methods
	funcs["getFields"] = function(){ return fields; }
	for(var i = 0, len = fields.length; i < len; i++){
		this[fields[i]] = "yup";
		var temp = this[fields[i]];
		funcs["get"+this.fields[i]] = function(i){
			return function(){ return this[fields[i]]}; 
		}(i);
	}
	
	var r = {}; //thing to return
	r["getFields"] = funcs["getFields"];
	for(var i = 0, len = fields.length; i < len; i++){
		r["get"+this.fields[i]] = funcs["get"+this.fields[i]];	
	}
	return r
  };
  
  return Application;
});
