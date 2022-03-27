import $ from "jquery";
const main = () => {
    console.log("main");

    // get href from local storage if exists
    if (localStorage.getItem("href") !== null) {
        console.log(localStorage.getItem("href"));
        // switch to the page that is stored in local storage
        switch (localStorage.getItem("href")) {
            case "#summary":
                $("article#summary").show();
                $("article#countries").hide();
                $("article#dailies").hide();
                break;
            case "#countries":
                $("article#summary").hide();
                $("article#countries").show();
                $("article#dailies").hide();
                break;
            case "#dailies":
                $("article#summary").hide();
                $("article#countries").hide();
                $("article#dailies").show();
                break;
            default:
                break;
        }
    }
};

export default main;