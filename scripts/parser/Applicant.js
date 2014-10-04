var Applicant = function(){
  var name = "";
  var DOB = "";
  var resume = ""; 

  function getName(){ return name; }
  function getDOB(){ return DOB; }
  function getResume(){ return resume; }
  
  return {
    getName: getName,
    getDOB: getDOB,
    getResume: getResume
  };
};
