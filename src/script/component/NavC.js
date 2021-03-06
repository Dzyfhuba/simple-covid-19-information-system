import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min";

import summary from "../view/summary";
import countries from "../view/countries";
import dailies from "../view/dailies";

const navc = () => {
    // nav-bar a each on click
    $("nav-bar > nav > a").each((i, e) => {
        $(e).on("click", () => {
            const href = e.getAttribute("href");
            // store href in local storage if it is not set
            localStorage.setItem("href", href);
            switch (href) {
                case "#summary":
                    // load summary
                    summary();
                    $("article#summary").show();
                    $("article#countries").hide();
                    $("article#dailies").hide();
                    break;
                case "#countries":
                    // load countries
                    countries();
                    $("article#summary").hide();
                    $("article#countries").show();
                    $("article#dailies").hide();
                    break;
                case "#dailies":
                    // load dailies
                    dailies();
                    $("article#summary").hide();
                    $("article#countries").hide();
                    $("article#dailies").show();
                    break;
                default:
                    break;
            }
        });
    });
    // $("nav-bar").on("click", "a", () => {
    //     let href = $(this).attr("href");
    //     // store href in local storage if it is not set
    //     localStorage.setItem("href", href);
    //     switch (href) {
    //         case "#summary":
    //             // load summary
    //             summary();
    //             $("article#summary").show();
    //             $("article#countries").hide();
    //             $("article#dailies").hide();
    //             break;
    //         case "#countries":
    //             // load countries
    //             countries();
    //             $("article#summary").hide();
    //             $("article#countries").show();
    //             $("article#dailies").hide();
    //             break;
    //         case "#dailies":
    //             // load dailies
    //             dailies();
    //             $("article#summary").hide();
    //             $("article#countries").hide();
    //             $("article#dailies").show();
    //             break;
    //         default:
    //             break;
    //     }
    // });
};
export default navc;