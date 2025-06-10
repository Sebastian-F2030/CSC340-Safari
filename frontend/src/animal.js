import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function Animal({animalid}) {

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

    var imageUrl = "/images/".concat(data.imagefile);
    var updateUrl = "/maintain/".concat(animalid);
    var deleteUrl = "/delete/".concat(animalid);

return(
        <div id="centered" >
                <div class="detailtitle">{data.name} {data.species}</div>
                <img src={imageUrl} alt="Prairie Dog" />
                <div class="info">Habitat: {data.habitat}</div>
                <div class="info">Location: {data.location}</div>
                <div class="info">{data.description}</div>
                <div class="info">
                    <span><a href= {updateUrl}>
                    <button type="button" class="btn btn-success">Update</button></a></span>
                    <span><a href= {deleteUrl}>
                    <button type="button" class="btn btn-success">Delete</button></a></span>
                </div>
        </div>
    
    );
}