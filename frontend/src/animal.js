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
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    var imageUrl = "/images/".concat((data.imagefile !== null) ? data.imagefile : 'noimage.jpg');
    var updateUrl = "/maintain/".concat(animalid);
    var deleteUrl = "/delete/".concat(animalid);

return(
    <div id="centered" >
        <div class="detailtitle">{(data.species!== '') ? data.species : 'Unknown Species'}</div>
        <div class="grid-container">
            <div class="grid-left-column"><img src={imageUrl} alt="Safari Animal" /></div>
            <div class="grid-right-column">
                <div class="grid-container">
                    <div class="grid-left-column">
                        <div class="info">Pet Name:</div>
                        <div class="info">Species:</div>
                        <div class="info">Habitat:</div>
                        <div class="info">Location:</div>
                        <div class="info">Description:</div>

                         <div class="maint-link-1">
                            <a href={updateUrl}><button type="button" class="btn">Update This Animal</button></a>
                        </div>
                        <div class="maint-link-2">
                            <a href={deleteUrl}><button type="button" class="btn">Delete This Animal</button></a>
                        </div>
                        <div class="maint-link-2">
                            <a href="/inventory"><button type="button" class="btn">Return To Full List</button></a>
                        </div>                       
                    </div>
                    <div class="grid-right-column">
                        <div class="info">{data.petname}</div>
                        <div class="info">{data.species}</div>
                        <div class="info">{data.habitat}</div>
                        <div class="info">{data.location}</div>
                        <div class="info">{data.description}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}