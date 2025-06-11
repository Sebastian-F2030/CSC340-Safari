import axios from 'axios';
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Pageheader from "./pageheader.js"
import Animal from "./animal.js"
import Inventory from "./inventory.js"

export default function Maintain({animalid}) {

    const root = ReactDOM.createRoot(document.getElementById('root'));
    const [petname, setPetName] = useState('');
    const [species, setSpecies] = useState('');
    const [habitat, setHabitat] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [imagefile, setImageFile] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get('http://localhost:8080/Wildlife/'.concat(animalid))
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [animalid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    const handleChangePetName = (event) => {
        setPetName(event.target.petname);
    };
    const handleChangeHabitat = (event) => {
        setHabitat(event.target.habitat);
    };
    const handleChangeSpecies = (event) => {
        setSpecies(event.target.species);
    };
    const handleChangeLocation = (event) => {
        setLocation(event.target.location);
    };
    const handleChangeDescription = (event) => {
        setDescription(event.target.habitat);
    };
    const handleChangeImageFile = (event) => {
        setImageFile(event.target.imagefile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputs = document.getElementById("myform").elements;
        
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        if (animalid < 1) {
            const bodydata = {
            'description': (inputs["description"].value === "") ? data.description : inputs["description"].value,
            'habitat': (inputs["habitat"].value === "") ? data.habitat : inputs["habitat"].value,
            'imagefile': (inputs["imagefile"].value === "") ? data.imagefile : inputs["imagefile"].value.split("\\").pop(),
            'location': (inputs["location"].value === "") ? data.location : inputs["location"].value,
            'petname': (inputs["petname"].value === "") ? data.petname : inputs["petname"].value,
            'species': (inputs["species"].value === "") ? data.species : inputs["species"].value
            };
            const endpointurl = "http://localhost:8080/Wildlife/Add";
            axios
            .post(endpointurl, bodydata, config)
            .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });

            return( root.render(
                <>
                <Pageheader />
                <Inventory />
                </>
            ));
        } else {
            const bodydata = {
            'animalid': inputs["animalid"].value,
            'description': (inputs["description"].value === "") ? data.description : inputs["description"].value,
            'habitat': (inputs["habitat"].value === "") ? data.habitat : inputs["habitat"].value,
            'imagefile': (inputs["imagefile"].value === "") ? data.imagefile : inputs["imagefile"].value.split("\\").pop(),
            'location': (inputs["location"].value === "") ? data.location : inputs["location"].value,
            'petname': (inputs["petname"].value === "") ? data.petname : inputs["petname"].value,
            'species': (inputs["species"].value === "") ? data.species : inputs["species"].value
            };
            const endpointurl = "http://localhost:8080/Wildlife/Update/".concat(animalid);
            axios
            .put(endpointurl, bodydata, config)
            .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });

            return( root.render(
                <>
                <Pageheader />
                <Animal animalid={animalid}/>
                </>
            ));
        }
        }
        
        
const headerclass="heading ".concat((animalid < 1) ? "nosee" : "");
const middleclass="middlecolumn ".concat((animalid < 1 ) ? "nosee" : "");
return(
    <div id="centered">
        <div class="detailtitle">Update Animal Details</div>
        <form id="myform" onSubmit={handleSubmit}><table>
            <tr><th></th><th class={headerclass}>Current Value</th><th class="heading">New Value</th></tr>

            <tr><td></td><td></td><td><input type="hidden" id="animalid" name="animalid" value={animalid} /></td></tr>

            <tr><td class="leftcolumn" >Pet Name:</td><td class={middleclass}>{data.petname}</td><td class="rightcolumn">
            <input type="text" class="inputshort" name="petname" value={petname} onChange={handleChangePetName} /></td></tr>
            <tr><td>Species:</td><td class={middleclass}>{data.species}</td><td>
            <input type="text" class="inputshort" name="species" value={species} onChange={handleChangeSpecies} /></td></tr>
            <tr><td>Habitat:</td><td class={middleclass}>{data.habitat}</td><td>
            <input type="text" class="inputshort" name="habitat" value={habitat} onChange={handleChangeHabitat} /></td></tr>
            <tr><td>Location:</td><td class={middleclass}>{data.location}</td><td>
            <input type="text" class="inputshort" name="location" value={location} onChange={handleChangeLocation} /></td></tr>
            <tr><td>Description:</td><td class={middleclass}>{data.description}</td><td>
            <textarea wrap="hard" class="inputdescription" name="description" value={description} onChange={handleChangeDescription} /></td></tr>
            <tr><td>Image File:</td><td class={middleclass}>{data.imagefile}</td><td>
            <input type="file" name="imagefile" value={imagefile} onChange={handleChangeImageFile} /></td></tr>
            </table>
            <br></br>
            <input type="submit" value="Submit"/>
        </form>
    </div>
);
}