"use strict";

// knappen:
let mybutton = document.getElementById("myBtn");

// Når man ruller 20px fra toppen af ​​dokumentet, vises knappen
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Når brugeren klikker på knappen, går man til toppen af ​​dokumentet
function topFunction() {
  document.body.scrollTop = 0; //  Safari
  document.documentElement.scrollTop = 0; //  Chrome, Firefox, IE and Opera
}

// koden er fra (“w3schools, 2024”).
