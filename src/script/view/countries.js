import $ from 'jquery';
import API from '../API';
import 'select2/dist/js/select2.full.min';
import 'select2/dist/css/select2.min.css';
import ApexCharts from 'apexcharts';

const countries = () => {

    var countries = $("article#countries");
    var route = countries.data("route");
    // get data from API
    const api = new API();
    api.getData(route).then(data => {
        // get name only of countries
        var countries = data.countries.map(country => country.name);
        selectOption(countries);

    }).catch(err => {
        console.log(err);
    });

    var options = {
        title: {
            text: 'Covid-19 Cases',
            align: 'center',
            margin: 20,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '24px',
                color: 'var(--color-text)',
            }
        },
        series: [10, 10, 10],
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        chart: {
            width: 380,
            type: 'pie',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    var countriesChart = new ApexCharts(document.querySelector("#countriesChart"), options);
    countriesChart.render();
    $("#countries select").on("change", () => {
        var selectedCountry = $("#countries select").val();
        var route = countries.data("route") + "/" + selectedCountry;
        // get data from API
        api.getData(route).then(data => {
            // update series
            var series = [data.confirmed.value, data.recovered.value, data.deaths.value];
            countriesChart.updateSeries(series);
        }).catch(err => {
            console.log(err);
        });
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