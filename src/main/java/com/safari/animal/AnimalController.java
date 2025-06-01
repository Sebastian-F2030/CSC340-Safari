package com.safari.animal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * AnimalController is a REST controller that handles HTTP requests related to
 * Animals.
 * It provides endpoints for CRUD operations on Animal data.
 */
@RestController
public class AnimalController {

  @Autowired
  private AnimalService AnimalService;

  /**
   * Endpoint to get all Animals
   *
   * @return List of all Animals
   */
  @GetMapping("/Animals")
  public Object getAllAnimals() {
    return AnimalService.getAllAnimals();
  }

  /**
   * Endpoint to get a Animal by ID
   *
   * @param id The ID of the Animal to retrieve
   * @return The Animal with the specified ID
   */
  @GetMapping("/Animal/{id}")
  public Animal getAnimalById(@PathVariable long id) {
    return AnimalService.getAnimalById(id);
  }

  /**
   * Endpoint to get Animals by name
   *
   * @param name The name of the Animal to search for
   * @return List of Animals with the specified name
   */
  @GetMapping("/AnimalsByName/{key}")
  public Object getAnimalsByName(@RequestParam String key) {
    if (key != null) {
      return AnimalService.getAnimalsByName(key);
    } else {
      return AnimalService.getAllAnimals();
    }

  }

  /**
   * Endpoint to get Animals by species
   *
   * @param species The species to search for
   * @return List of Animals with the specified species
   */
  @GetMapping("/Animals/species/{species}")
  public Object getAnimalsBySpecies(@PathVariable String species) {
    return AnimalService.getAnimalsBySpecies(species);
  }

  /**
   * Endpoint to get location Animals with location above a specified threshold
   *
   * @param location The location threshold for location Animals
   * @return List of location Animals with location above the specified threshold
   */
  @GetMapping("/Animals/location")
  public Object getAnimalByLocation(@RequestParam(name = "location", defaultValue = "3.0") String location) {
    return new ResponseEntity<>(AnimalService.getAnimalByLocation(location), HttpStatus.OK);

  }

  /**
   * Endpoint to add a new Animal
   *
   * @param Animal The Animal to add
   * @return List of all Animals
   */
  @PostMapping("/Animals")
  public Object addAnimal(@RequestBody Animal Animal) {
    return AnimalService.addAnimal(Animal);
  }

  /**
   * Endpoint to update a Animal
   *
   * @param id      The ID of the Animal to update
   * @param Animal The updated Animal information
   * @return The updated Animal
   */
  @PutMapping("/Animals/{id}")
  public Animal updateAnimal(@PathVariable Long id, @RequestBody Animal Animal) {
    AnimalService.updateAnimal(id, Animal);
    return AnimalService.getAnimalById(id);
  }

  /**
   * Endpoint to delete a Animal
   *
   * @param id The ID of the Animal to delete
   * @return List of all Animals
   */
  @DeleteMapping("/Animals/{id}")
  public Object deleteAnimal(@PathVariable Long id) {
    AnimalService.deleteAnimal(id);
    return AnimalService.getAllAnimals();
  }

  /**
   * Endpoint to write a Animal to a JSON file
   *
   * @param Animal The Animal to write
   * @return An empty string indicating success
   */
  @PostMapping("/Animals/writeFile")
  public Object writeJson(@RequestBody Animal Animal) {
    AnimalService.writeJson(Animal);
    return AnimalService.writeJson(Animal);
  }

  /**
   * Endpoint to read a JSON file and return its contents
   *
   * @return The contents of the JSON file
   */
  @GetMapping("/Animals/readFile")
  public Object readJson() {
    return AnimalService.readJson();

  }

}

