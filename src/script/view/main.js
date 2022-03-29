import $ from "jquery";
import summary from "./summary.js";
import countries from "./countries.js";
import dailies from "./dailies.js";

const main = () => {
    console.log("main");

    // get href from local storage if exists
    if (localStorage.getItem("href") !== null) {
        // switch to the page that is stored in local storage
        switch (localStorage.getItem("href")) {
            case "#summary":
                // load summary
                import ("./summary.js").then(() => {
                    summary();
                });
                $("article#summary").show();
                $("article#countries").hide();
                $("article#dailies").hide();
                break;
            case "#countries":
                // load countries
                import ("./countries.js").then(() => {
                    countries();
                });
                $("article#summary").hide();
                $("article#countries").show();
                $("article#dailies").hide();
                break;
            case "#dailies":
                // load dailies
                import ("./dailies.js").then(() => {
                    dailies();
                });
                $("article#summary").hide();
                $("article#countries").hide();
                $("article#dailies").show();
                break;
            default:
                break;
        }
    }

    // add '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">' to head tag
    $("head").append('<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">');

    // hide footer tag
    $("footer").hide();
    // show footer tag using scroll down key event
    window.onwheel = e => {
        if (e.deltaY >= 0) {
            $("footer").show();
        } else {
            $("footer").hide();
        }
    }
};

export default main;