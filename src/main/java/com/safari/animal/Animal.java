package com.safari.animal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalid;
    private String name;
    private String description;
    private String species;
    private String location;
    private String habitat;

    public Animal() {
    }

    public Animal(Long animalid, String name, String description, String species, String location, String habitat) {
        this.animalid = animalid;
        this.name = name;
        this.description = description;
        this.species = species;
        this.location = location;
        this.habitat = habitat;
    }

    public Animal( String name, String description, String species, String location, String habitat) {
        this.name = name;
        this.description = description;
        this.species = species;
        this.location = location;
        this.habitat = habitat;
    }

    public Long getAnimalId() {
        return animalid;
    }

    public void setAnimalId(Long id) {
        this.animalid = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }




}

