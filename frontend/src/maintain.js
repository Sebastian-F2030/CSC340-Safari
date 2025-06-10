import axios from 'axios';
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Pageheader from "./pageheader.js"
import Animal from "./animal.js"

export default function Maintain({animalid}) {

    const root = ReactDOM.createRoot(document.getElementById('root'));
    const [name, setPetName] = useState('');
    const [species, setSpecies] = useState('');
    const [habitat, setHabitat] = useState('');
    const [location, setLocation] = useState('');
    const [shortdesc, setShortDesc] = useState('');
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
    const handleChangeShortDesc = (event) => {
        setShortDesc(event.target.shortdesc);
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
        const bodydata = {
            'animalid': inputs["animalid"].value,
            'description': inputs["description"].value,
            'habitat': inputs["habitat"].value,
            'imagefile': inputs["imagefile"].value,
            'location': inputs["location"].value,
            'name': inputs["petname"].value,
            'shortdesc': inputs["shortdesc"].value,
            'species': inputs["species"].value
        };
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const puturl = "http://localhost:8080/Wildlife/Update/".concat(animalid);
        axios
        .put(puturl, bodydata, config)
        .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        return( root.render(
          <React.StrictMode>
            <Pageheader />
            <Animal animalid={animalid}/>
          </React.StrictMode>
          ));
        }

return(
    <div id="centered">
        <div class="detailtitle">Update Animal Details</div>
        <form id="myform" onSubmit={handleSubmit}><table>
            <tr><th></th><th>Current Value</th><th>New Value</th></tr>

            <tr><td></td><td></td><td><input type="hidden" id="animalid" name="animalid" value={animalid} /></td></tr>

            <tr><td>Pet Name:</td><td>{data.petname}</td><td>
            <input type="text" id="petname" name="petname" value={name} onChange={handleChangePetName} /></td></tr>
            <tr><td>Species:</td><td>{data.species}</td><td>
            <input type="text" id="species" name="species" value={species} onChange={handleChangeSpecies} /></td></tr>
            <tr><td>Habitat:</td><td>{data.habitat}</td><td>
            <input type="text" id="habitat" name="habitat" value={habitat} onChange={handleChangeHabitat} /></td></tr>
            <tr><td>Location:</td><td>{data.location}</td><td>
            <input type="text" id="location" name="location" value={location} onChange={handleChangeLocation} /></td></tr>
            <tr><td>Short Description:</td><td>{data.description}</td><td>
            <input type="text" id="shortdesc" name="shortdesc" value={shortdesc} onChange={handleChangeShortDesc} /></td></tr>
            <tr><td>Long Description:</td><td>{data.shortdesc}</td><td>
            <input type="text" id="description" name="description" value={description} onChange={handleChangeDescription} /></td></tr>
            <tr><td>Photo File:</td><td>{data.imagefile}</td><td>
            <input type="file" id="imagefile" name="imagefile" value={imagefile} onChange={handleChangeImageFile} /></td></tr>
            </table>
            <br></br>
            <input type="submit" value="Submit"/>
        </form>
    </div>
);
}