import $ from "jquery";

class API {
    constructor() {
        this.data = {};
    }

    getData(route="/api") {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://covid19.mathdro.id${route}`,
                type: "GET",
                timeout: 0,
            }).done(function(data) {
                resolve(data);
            }).fail(function(err) {
                reject(err);
            });
        });
    }
}
export default API;