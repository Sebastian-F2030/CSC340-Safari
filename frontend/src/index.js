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
  <>
    <Pageheader />
    <Animal animalid={animalid}/>
  </>
  );
} else if (request === "about") {
  root.render(
  <>
    <Pageheader />
    <About />
  </>
  );
} else if (request === 'inventory') {
  root.render(
  <>
    <Pageheader />
    <Inventory />
  </>
  );
} else if (request === 'search') {
  root.render(
  <>
    <Pageheader />
    <Search />
  </>
  );
} else if (request === 'maintain') {
  root.render(
  <>
    <Pageheader />
    <Maintain animalid={animalid}/>
  </>
  );
} else if (request === 'delete') {
  root.render(
    <Delete animalid={animalid}/>
  );
} else {
  root.render(
  <>
    <Pageheader />
    <Inventory />
  </>
  );
}
