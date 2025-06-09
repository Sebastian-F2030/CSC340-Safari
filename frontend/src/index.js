import React from 'react';
import ReactDOM from 'react-dom/client';
import './safari.css';
import Pageheader from "./pageheader.js"
import About from "./about.js"
import Animal from "./animal.js"
import Inventory from "./inventory.js"
import Search from "./search.js"
import Maintain from "./maintain.js"

const pagerequest = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root'));

if (pagerequest === '/animal' ) {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Animal />
  </React.StrictMode>
  );
} else if (pagerequest === "/about") {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <About />
  </React.StrictMode>
  );
} else if (pagerequest === '/inventory') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Inventory />
  </React.StrictMode>
  );
} else if (pagerequest === '/search') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Search />
  </React.StrictMode>
  );
} else if (pagerequest === '/maintain') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Maintain />
  </React.StrictMode>
  );
} else if (pagerequest === '/') {
  root.render(
  <React.StrictMode>
    <Pageheader />
    <Inventory />
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
