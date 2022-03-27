import $ from 'jquery';
import "bootstrap/dist/js/bootstrap.min";
const navc = () => {
    // nav-bar a on click
    $("nav-bar").on("click", "a", function() {
        var href = $(this).attr("href");
        // store href in local storage if it is not set
        if (localStorage.getItem("href") === null) {
            localStorage.setItem("href", href);
        }
        switch (href) {
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
    });
}
export default navc;