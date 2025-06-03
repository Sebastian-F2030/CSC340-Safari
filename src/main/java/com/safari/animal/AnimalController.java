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
  @GetMapping("/Wildlife")
  public Object getAllAnimals() {
    return AnimalService.getAllAnimals();
  }

  /**
   * Endpoint to get a Animal by ID
   *
   * @param id The ID of the Animal to retrieve
   * @return The Animal with the specified ID
   */
  @GetMapping("/Wildlife/{id}")
  public Animal getAnimalById(@PathVariable long id) {
    return AnimalService.getAnimalById(id);
  }

  /**
   * Endpoint to get Animals by name
   *
   * @param name The name of the Animal to search for
   * @return List of Animals with the specified name
   */
  @GetMapping("/Wildlife/Name/{name}")
  public Object getAnimalsByName(@PathVariable String name) {
    if (name != null) {
      return AnimalService.getAnimalsByName(name);
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
  @GetMapping("/Wildlife/Category/{category}")
  public Object getAnimalsByCategory(@PathVariable String category){
    return AnimalService.getAnimalsByCategory(category);
  }

  /**
   * Endpoint to get location by partial matching
   *
   * @param String to match against location values
   * @return Returning any and all animals as a list that have a location partially matching the input
   */
  @GetMapping("/Wildlife/Location/{location}")
  public Object getAnimalByLocation(@PathVariable String location) {
    return AnimalService.getAnimalByLocation(location);

  }

  /**
   * Endpoint to get habitat by partial matching
   *
   * @param String to match against habitat values
   * @return Returning any and all animals as a list that have a habitat partially matching the input
   */
  @GetMapping("/Wildlife/Habitat/{habitat}")
  public Object getAnimalByHabitat(@PathVariable String habitat) {
    return AnimalService.getAnimalByHabitat(habitat);

  }

  /**
   * Endpoint to get species by partial matching
   *
   * @param String to match against species values
   * @return Returning any and all animals as a list that have a species partially matching the input
   */
  @GetMapping("/Wildlife/Species/{species}")
  public Object getAnimalBySpecies(@PathVariable String species) {
    return AnimalService.getAnimalBySpecies(species);

  }
  
  /**
   * Endpoint to add a new Animal
   *
   * @param Animal The Animal to add
   * @return List of all Animals
   */
  @PostMapping("/Wildlife/Add")
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
  @PutMapping("/Wildlife/Update/{id}")
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
  @DeleteMapping("/Wildlife/Delete/{id}")
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
  @PostMapping("/Wildlife/writeFile")
  public Object writeJson(@RequestBody Animal Animal) {
    AnimalService.writeJson(Animal);
    return AnimalService.writeJson(Animal);
  }

  /**
   * Endpoint to read a JSON file and return its contents
   *
   * @return The contents of the JSON file
   */
  @GetMapping("/Wildlife/readFile")
  public Object readJson() {
    return AnimalService.readJson();

  }

}

