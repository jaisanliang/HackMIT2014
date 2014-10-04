define([], function(){ 
  var Application = function(){
    this.name = "";
    this.DOB = "";
    this.resume = ""; 

    function getName(){ return this.name; }
    function getDOB(){ return this.DOB; }
    function getResume(){ return this.resume; }
    
    return {
      getName: getName,
      getDOB: getDOB,
      getResume: getResume
    };
  };

  return Application;
});
