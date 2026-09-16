/*====================================
 BARCODE STUDIO PRO
 Application Controller
 Babbage Technologies
=====================================*/


const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");
//================================
// EVENTS
//================================

const homeKey =document.getElementById('home');
homeKey.addEventListener('click', ()=>{
    window.location="lp.html";
});



/*
 MOBILE SIDEBAR TOGGLE
*/


menuBtn.addEventListener(
"click",
()=>{


sidebar.classList.toggle("show");


});



/*
 CLOSE SIDEBAR WHEN CLICKING OUTSIDE
*/


document.addEventListener(
"click",
(e)=>{


if(

window.innerWidth <= 1000 &&

!sidebar.contains(e.target) &&

!menuBtn.contains(e.target)

){

sidebar.classList.remove("show");

}


});