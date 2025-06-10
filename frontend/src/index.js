import React from 'react';
import ReactDOM from 'react-dom/client';
import './safari.css';
import Pageheader from "./pageheader.js"
import About from "./about.js"
import Animal from "./animal.js"
import Inventory from "./inventory.js"
import Search from "./search.js"
import Maintain from "./maintain.js"
import Delete from "./delete.js"

const pagerequest = window.location.pathname;
var animalid = 0;
var request = 'none';
      
var urlarray = pagerequest.split("/");
if (( typeof urlarray[1] !== 'undefined' ) && ( urlarray[1] !== '' )) { request = urlarray[1]; };
if (( typeof urlarray[2] !== 'undefined' ) && ( urlarray[2] !== '' )) { animalid = urlarray[2]; };
      

const root = ReactDOM.createRoot(document.getElementById('root'));

if (request === 'animal' ) {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Animal animalid={animalid}/>
  </React.StrictMode>
  );
} else if (request === "about") {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <About />
  </React.StrictMode>
  );
} else if (request === 'inventory') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Inventory />
  </React.StrictMode>
  );
} else if (request === 'search') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Search />
  </React.StrictMode>
  );
} else if (request === 'maintain') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Maintain animalid={animalid}/>
  </React.StrictMode>
  );
} else if (request === 'delete') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Delete animalid={animalid}/>
  </React.StrictMode>
  );
} else {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Inventory />
  </React.StrictMode>
  );
}
