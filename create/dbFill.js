const { faker } = require('@faker-js/faker');
var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'schoolInternal'
});

var peopleCount = 120;
var certCount = 10;
var courseCount = 9; //courses per cert
var data = [];

// Generate certificates (major courses)
for(i=1; i<=certCount; i++){
	data.push([
		faker.company.bsAdjective()+" "+faker.company.bsNoun()
	])
} // shove these classes into our certificate table in the database
var certQuery = "INSERT INTO certificate (name) VALUES ?";
connection.query(certQuery, [data], (err, result)=>{
	console.log(err);
	console.log(result);
}); // empty data, we using it again
data = [];


function format(i,j){
	i = i.toLocaleString("en-US", {minimumIntegerDigits:2, useGrouping:false});
	j = j.toLocaleString("en-US", {minimumIntegerDigits:2, useGrouping:false});
	var num = i+j;
	return num;
}
// Generate courses, [courseCount] in each certificate
for(i=1; i<=certCount; i++){
	for(j=1; j<=courseCount; j++){
		var num = format(i,j);
		data.push([
			faker.company.catchPhrase(),
			faker.lorem.paragraphs(2),
			num,
			i
		])
	}
} // shove this course info into the course table in the database
var courseQuery = "INSERT INTO course (name, description, num, cert_id) VALUES ?";
connection.query(courseQuery, [data], (err, result)=>{
	console.log(err);
	console.log(result);
}); // empty data, we using it again
data = [];

// Generate [peopleCount] different entries representing a person
for(i=1; i<=peopleCount; i++){
	var gender = faker.name.gender();
	if(Math.random()>.94){
		data.push([
			faker.name.prefix(gender)+" "+faker.name.firstName(gender)+" "+faker.name.lastName(gender),
			faker.finance.amount(26, 80, 0),
			false
		]);
	}else{
		data.push([
			faker.name.firstName()+" "+faker.name.lastName(),
			faker.finance.amount(4, 75, 0),
			true
		]);
	}
} // shove all those pretty new people into the person table in the database
var personQuery = "INSERT INTO person (name, age, student) VALUES ?";
connection.query(personQuery, [data], (err, result)=>{
	console.log(err);
	console.log(result);
}); // empty data, we using it again
data = [];

// ok, now lets put our people into their classes;
// had an idea here, to fill courses in a cert until random decides to move to the next person, maybe later;
for(i=1; i<=peopleCount; i++){
	data.push([
		i,
		Math.ceil(Math.random()*(certCount*courseCount)),
		Math.floor(Math.random()*2)
	])
} //shove the relations into the relation table in our database
var relateQuery = "INSERT INTO relation (person_id, course_id, course_clear) VALUES ?";
connection.query(relateQuery, [data], (err, result)=>{
	console.log(err);
	console.log(result);
})

connection.end();