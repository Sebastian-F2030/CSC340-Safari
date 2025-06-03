package com.safari.animal;

import java.io.IOException;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * AnimalService is a service class that handles the business logic for
 * managing Animals.
 * It provides methods to perform CRUD operations on Animal data.
 */
@Service
public class AnimalService {

  @Autowired
  private AnimalRepository AnimalRepository;

  /**
   * Method to get all Animals
   *
   * @return List of all Animals
   */
  public Object getAllAnimals() {
    return AnimalRepository.findAll();
  }

  /**
   * Method to get a Animal by ID
   *
   * @param AnimalId The ID of the Animal to retrieve
   * @return The Animal with the specified ID
   */
  public Animal getAnimalById(@PathVariable long AnimalId) {
    return AnimalRepository.findById(AnimalId);
  }

  /**
   * Method to get Animals by name
   *
   * @param name The name of the Animal to search for
   * @return List of Animals with the specified name
   */
  public Object getAnimalsByName(String name) {
    return AnimalRepository.findByNameContaining(name);
  }

  /**
   * Method to get Animals by species
   *
   * @param species The species to search for
   * @return List of Animals with the specified species
   */
  public Object getAnimalsByCategory(String category) {
    return AnimalRepository.getAnimalsByCategory(category);
  }

  /**
   * Fetch all Animals with a habitat matching input
   *
   * @param String to match against habitat values
   * @return the list of matching Animals
   */
  public Object getAnimalByHabitat(String habitat) {
    return AnimalRepository.findByHabitatContaining(habitat);
  }

    /**
   * Fetch all Animals with a species matching input
   *
   * @param String to match against species values
   * @return the list of matching Animals
   */
  public Object getAnimalBySpecies(String species) {
    return AnimalRepository.findBySpeciesContaining(species);
  }

    /**
   * Fetch all Animals with a location matching input
   *
   * @param String to match against location values
   * @return the list of matching Animals
   */
  public Object getAnimalByLocation(String location) {
    return AnimalRepository.findByLocationContaining(location);
  }

  /**
   * Method to add a new Animal
   *
   * @param Animal The Animal to add
   */
  public Animal addAnimal(Animal Animal) {
    return AnimalRepository.save(Animal);
  }

  /**
   * Method to update a Animal
   *
   * @param AnimalId The ID of the Animal to update
   * @param Animal   The updated Animal information
   */
  
  public Object updateAnimal(Long Animalid, Animal newAnimal) {
    return AnimalRepository.findById(Animalid).map(Animal -> {
        Animal.setName(newAnimal.getName());
        Animal.setDescription(newAnimal.getDescription());
        Animal.setSpecies(newAnimal.getSpecies());
        Animal.setLocation(newAnimal.getLocation());
        Animal.setHabitat(newAnimal.getHabitat());
        return AnimalRepository.save(Animal);
      });
  }

  /**
   * Method to delete a Animal
   *
   * @param AnimalId The ID of the Animal to delete
   */
  public void deleteAnimal(Long animalid) {
    AnimalRepository.deleteById(animalid);
  }

  /**
   * Method to write a Animal object to a JSON file
   *
   * @param Animal The Animal object to write
   */
  public String writeJson(Animal Animal) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      objectMapper.writeValue(new File("Animals.json"), Animal);
      return "Animal written to JSON file successfully";
    } catch (IOException e) {
      e.printStackTrace();
      return "Error writing Animal to JSON file";
    }

  }

  /**
   * Method to read a Animal object from a JSON file
   *
   * @return The Animal object read from the JSON file
   */
  public Object readJson() {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.readValue(new File("Animals.json"), Animal.class);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }

  }

}

