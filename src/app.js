import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/style.css";
import "./styles/pallete.css";
import "./script/component/NavBar";
import "./script/view/summary";
import main from "./script/view/main.js";
import navc from "./script/component/NavC";
import summary from "./script/view/summary.js";
import countries from "./script/view/countries.js";
import dailies from "./script/view/dailies.js";

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("DOMContentLoaded", summary);
document.addEventListener("DOMContentLoaded", countries);
document.addEventListener("DOMContentLoaded", dailies);
document.addEventListener("DOMContentLoaded", navc);