import $ from 'jquery';
import API from '../API';
import 'select2/dist/js/select2.full.min';
import 'select2/dist/css/select2.min.css';

const countries = () => {

    var countries = $("article#countries");
    var route = countries.attr("route");
    console.log(route);
    // get data from API
    const api = new API();
    api.getData(route).then(data => {
        // get name only of countries
        var countries = data.countries.map(country => country.name);
        console.log(countries);
        selectOption(countries);

    }).catch(err => {
        console.log(err);
    });
};
export default countries;

function selectOption(countries) {
    var select = $("#countries select");
    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.text = countries[i];
        select.append(option);
    }

    // select2 with bootstrap 5
    $("#countries select").select2();

}