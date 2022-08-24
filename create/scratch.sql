#########################################################################
# Single query that gives all requested information about staff members #
#########################################################################
SELECT 
	person.name AS Teacher, 
    person.age AS Age, 
    certificate.name AS Major,
    (SELECT CONCAT(MIN(course.id),"-",MAX(course.id))
 		FROM course WHERE certificate.id = course.cert_id 
 		GROUP BY certificate.id) AS Class_IDs
FROM relation 
    JOIN person ON relation.person_id = person.id
    JOIN course ON relation.course_id = course.id
    JOIN certificate ON course.cert_id = certificate.id
WHERE person.student = 0
GROUP BY course.num
ORDER BY course.num;
#########################################################################
# Single query that gives all requested information about staff members #
#########################################################################


####################################################################
# Single query that gives all requested information about students #
####################################################################
# I'm using student.id as each student's id, it's not pretty.      #
####################################################################
SELECT 
	person.name AS Name,
    person.age AS Age,
    person.id AS Student_Id,
    course.name AS Course,
    certificate.name AS Major
FROM relation
    JOIN person ON relation.person_id = person.id
    JOIN course ON relation.course_id = course.id
    JOIN certificate ON course.cert_id = certificate.id
WHERE person.student = 1
GROUP BY person.id
ORDER BY person.name;
####################################################################
# Single query that gives all requested information about students #
####################################################################




SELECT
    certificate.name AS Major,
    COUNT(course.id) AS Course_Count
FROM certificate
    JOIN course ON course.cert_id = certificate.id
GROUP BY certificate.name;