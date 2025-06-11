export default function About(){
const imageUrl = './images/SafariGuide.jpg';
    return(
    <div id="centered" >
      <div class="detailtitle">Our Safari Guides</div>
      <img src={imageUrl} alt="Our Safari team" />
	<div class="longdesc">
  
  Our wonderful tour guides! From the left: Jimmy (Jimbo) Driveroni, Shane (Speedy) Dawntails, and Michael (Sample) Bakers. 
  These fine gentlemen have and incredible record of keeping tourists and wildlife safe at the same time! They have had no 
  incidents this year but last year Michael earned his nickname when a Lion bit a part of his behind before 
  he ran away to safety. <i>(I do not own this image nor are they the people described in this about page. They just seemed like cool guys.)</i>
	</div>  
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" 
    crossorigin="anonymous"></script>
    </div>
    );
}