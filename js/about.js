//aprire e chiudere un div
//dichiarazioni e prendere elementi html
let x;

let targetContent1 = document.getElementById("addinfo1");
let btn1 = document.getElementById("btn1");

let targetContent2 = document.getElementById("addinfo2");
let btn2 = document.getElementById("btn2");

//dichiaro funzione generale
function apri (x) {
  if (x.style.display !== "none") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};

//chiamo funzione specifica in funzione di un evento 
btn1.addEventListener ("click", function(e) {
  apri(targetContent1);
});

btn2.addEventListener ("click", function(e) {
  apri(targetContent2);
});



//cambio stile
//prendo lementi html e dichiaro

let btnstile = document.getElementById("cambio-stile");
let mainstyle = document.getElementById("about-style");
let headerstyle = document.getElementById("header-style");
let behance = document.getElementById("behance");
let instagram = document.getElementById("instagram");

//cambio stile main: se href ricercato da getAttribute è 'normale' allora cambia lo stile in 'alt', se no fa il contrario
function cambia_stile_main () {
    let mainstyleHref = mainstyle.getAttribute("href");
    if (mainstyleHref === "./css/about.css") {
        mainstyle.setAttribute("href", "./css/about_alt.css")
    }
    else {
        mainstyle.setAttribute("href", "./css/about.css")
    }
};

function cambia_stile_header () {
    let headerstyleHref = headerstyle.getAttribute("href");
    if (headerstyleHref === "./css/header_footer.css") {
        headerstyle.setAttribute("href", "./css/header_footer_alt.css");
        behance.innerHTML = '<image src="./assets/behance1.jpg" alt="Behance" style="width:33,15px;height:30px;"></image>';
        instagram.innerHTML = '<image src="./assets/instagram1.jpg" alt="Instagram" style="width: 30px;height:30px;"></image>';
    }
    else {
        headerstyle.setAttribute("href", "./css/header_footer.css")
        behance.innerHTML = '<image src="./assets/behance.jpg" alt="Behance" style="width:33,15px;height:30px;"></image>';
        instagram.innerHTML = '<image src="./assets/instagram.jpg" alt="Instagram" style="width: 30px;height:30px;"></image>';
    }
};

//fai partire la funzione quando si clicca sul bottone apposito
btnstile.addEventListener ("click", function(e){
    cambia_stile_main();
    cambia_stile_header();
});
