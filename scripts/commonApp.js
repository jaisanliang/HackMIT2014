require(["parser/parser"], function(Parser){
  var Person = Applicant();  
  Person.name = "hello";
  console.log(Person.getName());
});
