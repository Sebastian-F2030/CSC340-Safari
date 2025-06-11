import ReactDOM from 'react-dom/client';
import Pageheader from "./pageheader.js"
import Inventory from "./inventory.js"
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function Delete({animalid}){

    const root = ReactDOM.createRoot(document.getElementById('root'));
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        // Make Delete request to delete data
        axios
            .delete('http://localhost:8080/Wildlife/Delete/'.concat(animalid))
            .then((response) => {
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [animalid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


return(root.render(
  <>
    <Pageheader />
    <Inventory />
  </>
  ));
}