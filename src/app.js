import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/style.css";
import "./styles/pallete.css";
import "./script/component/NavBar";
import "./script/view/summary";
import main from "./script/view/main.js";
import navc from "./script/component/NavC";

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("DOMContentLoaded", navc);