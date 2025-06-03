# Safari API
## Description
Simple CRUD API for Animal Objects with JPA

### Version
1.0.0

## Installation
- Get the project
    - clone
        ```
      git clone https://github.com/uncg-csc340/su25-jpa-crud-api.git
        ```
    - OR download zip.
- Open the project in VS Code.
- This project is built to run with jdk 21.
- [Dependencies](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/3149ec363e4aae4baebe6f755df7d4c2d79c9d2c/pom.xml#L32) to JPA and Postgres in addition to the usual Spring Web. JPA handles the persistence, Postgresql is the database to be used.
- [`/src/main/resources/application.properties`](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/main/src/main/resources/application.properties) This file  is the configuration for the PostgreSQL database to use for the API.
  - You MUST have the database up and running before running the project!
    - Login to your neon.tech account.
    - Locate your database project.
    - On the project dashboard, click on "Connect" and select Java.
    - Copy the connection string provided.
    - Paste it as a value for the property `spring.datasource.url`. No quotation marks.
- Build and run the main class. You should see a new table created in the Neon database.
## Notes
### Java - [Spring ORM with JPA and Hibernate](https://medium.com/@burakkocakeu/jpa-hibernate-and-spring-data-jpa-efa71feb82ac)
- We are using ORM (Object-Relational Mapping) to deal with databases. This is a technique that allows us to interact with a relational database using object-oriented programming principles.
- JPA (Jakarta Persistence, formerly Java Persistence API) is a specification that defines ORM standards in Java. It provides an abstraction layer for ORM frameworks to make concrete implementations.
- Hibernate: Hibernate is a popular ORM framework that implements JPA. It simplifies database operations by mapping Java objects to database tables and handling queries efficiently.
Spring ORM allows seamless integration of Hibernate and JPA, making database interactions more manageable and reducing boilerplate code.
### StudentX Java classes have different purposes: Separation of concerns!
- [Entity](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/Student.java#L9)
  - The Student class is annotated as an `@Entity `. This is used to map class attributes to database tables and SQL types.
  - We also annotated with `@Table` to give Hibernate directions to use this specific table name. This is optional but it helps with naming conventions.
  - Any Entity must have at least one attribute that is annotated as an `@Id`. In our case it's conveniently the `studentId` attribute.
    - We are also using an autogeneration strategy for the ID. This way we are not manually assigning IDs to our students. This is optional.
       - For this reason, we also added a constructor to make a Student without an ID.
  - An Entity must have a no-argument constructor.
- [Repository](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentRepository.java#L8)
  - We are using an extension of the JPA Repository that comes with prebuilt database operations such as select all, select by id, select by any other reference, insert, delete, etc.
  - Annotate it as a `@Repository`.
  - We parametrize this using our object and its ID type.
    - `public interface StudentRepository extends JpaRepository<Student, Long>` => We want to apply the JPA repository operations on the `Student` type. The `Student` has an ID of type `long`.
  - If we need special database queries that are not the standard ones mentioned above, we can create [a method with a special purpose query](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentRepository.java#L13) as shown. This is an interface so no implementation body.
- [Service](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentService.java#L12)
  - Annotated as a `@Service`.
  - It is the go-between from controller to database. In here we define what functions we need from the repository. A lot of the functions are default functions that our repository inherits from JPA (save, delete, findAll, findByX), some of them are custom made (getHonorsStudents, getStudentsByName).
  - It asks the repository to perform SQL queries.
  - The Repository class is [`@Autowired`](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentService.java#L15). This is for managing the dependency to the repository. Do not use a constructor to make a Repository object, you will get errors.
- [Rest Controller](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentController.java#L18)
  - Annotated as a `@RestController`.
  - It asks the Service class to perform data access functions.
  - The Service class is [`@Autowired`](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/0177d978f05d64aa8ba1aac34cee4829e5ec6049/src/main/java/com/csc340/crud_jpa_demo/student/StudentController.java#L21) here as well :)

## API Endpoints
Base URL: [`http://localhost:8080/Wildlife`](http://localhost:8080/Wildlife)


1. ### [`/`](http://localhost:8080/Wildlife) (GET)
Gets a list of all Animals in the database.

#### Response - A JSON array of Animal objects.

 ```
[
  {
    "name":"Ella",
    "description":"Large and grey",
    "species":"African Elephant",
    "location":"Northern Tanzania",
    "habitat":"savannas, grasslands, and forests",
    "animalId":1
  }
  {
    "name":"Henry",
    "description":"Black and round",
    "species":"Hippopotamus",
    "location":"Central Tanzania",
    "habitat":"rivers, lakes, swamps, and estuaries",
    "animalId":2
  }
  {
    "name":"Jerry",
    "description":"Tall",
    "species":"Giraffe",
    "location":"Northern Tanzania",
    "habitat":"savannas, open woodlands, and grasslands",
    "animalId":3
  }
]
```

2. ### [`/{studentId}`](http://localhost:8080/Wildlife/1) (GET)
Gets an individual Animal in the system. Each Animal is identified by a numeric `animalId`

#### Parameters
- Path Variable: `animalId` &lt;Long &gt; - REQUIRED

#### Response - A single Student

```
  {
    "name":"Ella",
    "description":"Large and grey",
    "species":"African Elephant",
    "location":"Northern Tanzania",
    "habitat":"savannas, grasslands, and forests",
    "animalId":1
  }
```

3. ### [`/Name/{name}`](http://localhost:8080/Wildlife/Name/Ella) (GET)
Gets a list of Animals with a name that contains the given string.

#### Parameters
- Path Variable: `name` &lt;String &gt; - REQUIRED

#### Response - A JSON array of Student objects.

```
[
  {
    "name":"Ella",
    "description":"Large and grey",
    "species":"African Elephant",
    "location":"Northern Tanzania",
    "habitat":"savannas, grasslands, and forests",
    "animalId":1
  }
]
```

4. ### [`/Species/{species}`](http://localhost:8080/Wildlife/Species/Giraffe) (GET)
Gets a list of Animals for a named species.

#### Parameters
- path variable: `species` &lt; String &gt; - REQUIRED

#### Response - A JSON array of Student objects.

```
[
  {
    "name":"Jerry",
    "description":"Tall",
    "species":"Giraffe",
    "location":"Northern Tanzania",
    "habitat":"savannas, open woodlands, and grasslands",
    "animalId":3
  }
]
```
5. ### [`/honors`](http://localhost:8080/Wildlife/Location/Northern) (GET)
Gets a list of Animals with a location including the input.

#### Parameters
- query parameter: `gpa` &lt;Double&gt; - REQUIRED

#### Response - A JSON array of Student objects.

```
[
  {
    "studentId": 1,
    "name": "Alice Smith",
    "major": "CSC",
    "gpa": 3.88
  },
  {
    "studentId": 7,
    "name": "John Doe",
    "major": "CSC",
    "gpa": 3.65
  }
]
```
6. ### [`/`](http://localhost:8080/students) (POST)
Create  a new Student entry

#### Request Body
A student object. Note the object does not include an ID as this is autogenerated.
```
{
  "name":"Bob Testing",
  "email":"bt@test.edu",
  "major":"Computer Science",
  "gpa":3.44
}
```
#### Response - The newly created Student.

```
  {
    "studentId": 3,
    "name": "Bob Testing",
    "email": "bt@test.edu",
    "major": "Computer Science",
    "gpa": 3.44
  }
```

7. ### [`/{studentId}`](http://localhost:8080/students/3) (PUT)
Update an existing Student.

#### Parameters
- Path Variable: `studentId` &lt;integer&gt; - REQUIRED

#### Request Body
A student object with the updates.
```
{
  "studentId":3,
  "name":"Mister Updated",
  "email":"bt@test.edu",
  "major":"Computer Science",
  "gpa":3.44
}
```
#### Response - the updated Student object.
```
{
  "studentId":3,
  "name":"Mister Updated",
  "email":"bt@test.edu",
  "major":"Computer Science",
  "gpa":3.44
}
```

8. ### [`/{studentId}`](http://localhost:8080/students/3) (DELETE)
Delete an existing Student.

#### Parameters
- Path Variable: `studentId` &lt;integer&gt; - REQUIRED

#### Response - the updated list of Students.
```
[
  {
    "studentId": 1,
    "name": "John Doe",
    "email": "jd@uncg.edu",
    "major": "Computer Science",
    "gpa": 3.5
  },
  {
    "studentId": 2,
    "name": "Jane Smith",
    "email": "js@uncg.edu",
    "major": "Mathematics",
    "gpa": 3.8
  }
]
```
