import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function Inventory() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get("http://localhost:8080/Wildlife")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    var imageUrl = "/images/";
    var animalUrl = "/animal/";

    return (
        <div id="centered" >
            <div class="detailtitle">Animals You Will Encounter</div>
            <ul id="animallist">
                {data.map((animal) => (
                <li class="col">
                    <img src={imageUrl.concat(animal.imagefile)} width="320" height="240" alt="animal close up" /><br/>
	                <span> {animal.shortdesc} </span><br />
                    <span><a href= {animalUrl.concat(animal.animalid)}>
                    <button type="button" class="btn btn-success">{animal.species}</button></a></span><br/>
                </li>    
                ))}
            </ul>
        </div>
    );
};