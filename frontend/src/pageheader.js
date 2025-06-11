
function Pagemenu() {
  return (
    <div id="menulinks">
    <ul id="menulist"> 
  <li className="nav-item"><a href="/inventory" className="nav-link">Our Animals</a></li>  
  <li className="nav-item"><a href="/maintain" className="nav-link">Add Animal</a></li>
  <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
  </ul> 
  </div>
  );
}

export default function Pageheader() {
  return (
    <header id="pageheader"> 
     <span className="sitetitle">Tanzania Safari Tours</span>
     <Pagemenu />
  </header>
  );
}
