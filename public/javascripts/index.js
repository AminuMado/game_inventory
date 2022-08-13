console.log("WE in?");
const bonfireLogo = document.querySelector(".bonfire_logo");
const overlay = document.querySelector(".overlay");
const sideBar = document.querySelector(".sidebar_container");

function handleClick(e) {
  overlay.classList.toggle("active");
  sideBar.classList.toggle("active");
}
console.log(bonfireLogo);
bonfireLogo.addEventListener("click", handleClick);
