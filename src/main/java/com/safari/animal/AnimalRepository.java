package com.safari.animal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query(value = "select * from Animals s where s.species = ?1", nativeQuery = true)
    List<Animal> getAnimalsBySpecies(String species);

    @Query(value = "select * from Animals s where s.location = ?1", nativeQuery = true)
    List<Animal> getAnimalByLocation(String location);

    @Query(value = "select * from Animals s where s.name like %?1% ", nativeQuery = true)
    List<Animal> getAnimalsByName(String name);

    Animal findById(long animal_id);

    @SuppressWarnings("null")
    List<Animal> findAll();
}
