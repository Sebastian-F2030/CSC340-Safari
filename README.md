# Safari API
## Description
Simple CRUD API for Animal Objects with JPA

### Version
1.0.3

## Installation
- Get the project
    - clone
        ```
      git clone https://github.com/Sebastian-F2030/CSC340-Safari
        ```
    - OR download zip.
- Open the project in VS Code.
- This project is built to run with jdk 21.
- [Dependencies](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/pom.xml#L32) to JPA and Postgres in addition to the usual Spring Web. JPA handles the persistence, Postgresql is the database to be used.
- [`/src/main/resources/application.properties`](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/resources/application.properties) This file  is the configuration for the PostgreSQL database to use for the API.
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
### Animal Java classes have different purposes: Separation of concerns!
- [Entity](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/Animal.java)
  - The Animal class is annotated as an `@Entity`. This is used to map attributes to database tables and SQL types.
  - We also annotated with `@Table` to give Hibernate directions to use this specific table name.
  - Any Entity must have at least one attribute that is annotated as an `@Id`. In this case it's `animalid`.
    - We are also using an autogeneration strategy for the ID. This way we are not manually assigning IDs to our Animals.
       - also added a constructor to make an Animal without an ID.
  - An Entity must have a no-argument constructor.
- [Repository](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalRepository.java)
  - We are using an extension of the JPA Repository that comes with prebuilt database operations such as select all, select by id, select by any other reference, insert, delete, etc.
  - Annotate it as a `@Repository`.
  - We parametrize this using our object and its ID type.
    - `public interface AnimalRepository extends JpaRepository<Animal, Long>` => We want to apply the JPA repository operations on the `Animal` type. The `Animal` has an ID of type `long`.
  - If we need special database queries that are not the standard ones mentioned above, we can create [a method with a special purpose query](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalRepository.java#L18) as shown. This is an interface so no implementation body.
- [Service](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalService.java)
  - Annotated as a `@Service`.
  - It is the go-between from controller to database. In here we define what functions we need from the repository. A lot of the functions are default functions that our repository inherits from JPA (save, delete, findAll, findByX), some of them are custom made (getAnimalByCategory).
  - It asks the repository to perform SQL queries.
  - The Repository class is [`@Autowired`](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalService.java#L21). This is for managing the dependency to the repository. Do not use a constructor to make a Repository object, you will get errors.
- [Rest Controller](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalController.java)
  - Annotated as a `@RestController`.
  - It asks the Service class to perform data access functions.
  - The Service class is [`@Autowired`](https://github.com/Sebastian-F2030/CSC340-Safari/blob/main/src/main/java/com/safari/animal/AnimalController.java#L25).

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

2. ### [`/{id}`](http://localhost:8080/Wildlife/1) (GET)
Gets an individual Animal in the system. Each Animal is identified by a numeric `animalId`

#### Parameters
- Path Variable: `animalId` &lt;Long &gt; - REQUIRED

#### Response - A single Animal

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
]
```

4. ### [`/Species/{species}`](http://localhost:8080/Wildlife/Species/Giraffe) (GET)
Gets a list of Animals for a named species.

#### Parameters
- Path Variable: `species` &lt; String &gt; - REQUIRED

#### Response - A JSON array of Animal objects.

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
5. ### [`/Location/{location}`](http://localhost:8080/Wildlife/Location/Northern) (GET)
Gets a list of Animals with a location including the input.

#### Parameters
- Path Variable: `location` &lt;String &gt; - REQUIRED

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
    "name":"Jerry",
    "description":"Tall",
    "species":"Giraffe",
    "location":"Northern Tanzania",
    "habitat":"savannas, open woodlands, and grasslands",
    "animalId":3
  }
]
```

6. ### [`/Habitat/{habitat}`](http://localhost:8080/Wildlife/Habitat/Savanna) (GET)
Gets a list of Animals with a habitat including the input.

#### Parameters
- Path Variable: `habitat` &lt;String &gt; - REQUIRED

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
    "name":"Jerry",
    "description":"Tall",
    "species":"Giraffe",
    "location":"Northern Tanzania",
    "habitat":"savannas, open woodlands, and grasslands",
    "animalId":3
  }
]
```
8. ### [`/Add`](curl -X POST localhost:8080/Wildlife/Add -H 'Content-type:application/json' -d '{ "name": "Pete", "description": "Short", "species": "Prairie Dog", "location": "On a mound", "habitat": "Plains" }')
Create  a new Animal entry

#### Request Body
An Animal object. ID is autogenerated.
```
{ 
  "name": "Pete", 
  "description": "Short", 
  "species": "Prairie Dog", 
  "location": "On a mound", 
  "habitat": "Plains" 
}
```
#### Response - The newly created Animal.

```
  { 
    "name": "Pete", 
    "description": "Short", 
    "species": "Prairie Dog", 
    "location": "On a mound", 
    "habitat": "Plains" 
    "animalId":6
  }
```

9. ### [`/Update/{id}`](curl -X PUT localhost:8080/Wildlife/Update/6 -H 'Content-type:application/json' -d '{ "name": "Pete", "description": "Short and Fast", "species": "Prairie Dog", "location": "On a mound", "habitat": "Plains" }')
Update an existing Animal.

#### Parameters
- Path Variable: `id` &lt;integer&gt; - REQUIRED

#### Request Body
An Animal object with the updates.
```
{
   "name": "Pete", 
   "description": "Short", 
   "species": "Prairie Dog", 
   "location": "On a mound", 
   "habitat": "Plains" 
}
```
#### Response - the updated Animal object.
```
{
   "name": "Pete", 
   "description": "Short and Fast", 
   "species": "Prairie Dog", 
   "location": "On a mound", 
   "habitat": "Plains" 
}
```

10. ### [`/{id}`](curl -X DELETE localhost:8080/Wildlife/Delete/4)
Delete an existing Animal.

#### Parameters
- Path Variable: `id` &lt;integer&gt; - REQUIRED

#### Response - the updated list of Animals.
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
