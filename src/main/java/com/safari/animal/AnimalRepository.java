package com.safari.animal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findBySpeciesContaining(String species);

    List<Animal> findByHabitatContaining(String habitat);

    List<Animal> findByLocationContaining(String location);

    @Query(value = "select * from animal s where s.species = ?1 or s.location = ?1 or s.habitat = ?1", nativeQuery = true)
    List<Animal> getAnimalsByCategory(String category);

    List<Animal> findByNameContaining(String name);

    Animal findById(long animalid);

    @SuppressWarnings("null")
    List<Animal> findAll();

    Animal deleteById(long animalid);
}
