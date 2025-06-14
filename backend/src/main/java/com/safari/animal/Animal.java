package com.safari.animal;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
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
    @JsonProperty("animalid")
    private Long animalid;
    private String petname;
    @Column(columnDefinition = "text")
    private String description;
    private String species;
    private String location;
    private String habitat;
    @JsonProperty("imagefile")
    private String imagefile;

    public Animal() {
    }

    public Animal(Long animalid, String petname, String description, String species,
        String location, String habitat, String imagefile) {
        this.animalid = animalid;
        this.petname = petname;
        this.description = description;
        this.species = species;
        this.location = location;
        this.habitat = habitat;
        this.imagefile = imagefile;
    }

    public Animal( String petname, String description, String species,
        String location, String habitat, String imagefile) {
        this.petname = petname;
        this.description = description;
        this.species = species;
        this.location = location;
        this.habitat = habitat;
        this.imagefile = imagefile;
    }

    public Long getanimalid() {
        return animalid;
    }

    public void setanimalid(Long id) {
        this.animalid = id;
    }

    public String getpetname() {
        return petname;
    }

    public void setpetname(String petname) {
        this.petname = petname;
    }

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
    }

    public String getspecies() {
        return species;
    }

    public void setspecies(String species) {
        this.species = species;
    }

    public String getlocation() {
        return location;
    }

    public void setlocation(String location) {
        this.location = location;
    }

    public String gethabitat() {
        return habitat;
    }

    public void sethabitat(String habitat) {
        this.habitat = habitat;
    }

    public String getimagefile() {
        return imagefile;
    }

    public void setimagefile(String imagefile) {
        this.imagefile = imagefile;
    }


}

