require(["parser/Applicant"], function(Applicant){
  var Person = Applicant();  
  Person.name = "hello";
  console.log(Person.getName());
});
