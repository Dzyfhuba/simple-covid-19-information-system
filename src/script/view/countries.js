import $ from 'jquery';
import API from '../API';
import 'select2/dist/js/select2.full.min';
import 'select2/dist/css/select2.min.css';
import ApexCharts from 'apexcharts';

const countries = () => {

    let countries = $("article#countries");
    let route = countries.data("route");
    // get data from API
    const api = new API();
    api.getData(route).then(data => {
        // get name only of countries
        let countries = data.countries.map(country => country.name);
        selectOption(countries);

    }).catch(err => {
        console.log(err);
    });

    let options = {
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
            }
        }],
        legend: {
            position: 'bottom',
            labels: {
                useSeriesColors: true
            }
        }
    }
    let countriesChart = new ApexCharts(document.querySelector("#countriesChart"), options);
    countriesChart.render();
    $("#countries select").on("change", () => {
        let selectedCountry = $("#countries select").val();
        let route = countries.data("route") + "/" + selectedCountry;
        // get data from API
        api.getData(route).then(data => {
            // update series
            let series = [data.confirmed.value, data.recovered.value, data.deaths.value];
            countriesChart.updateSeries(series);
        }).catch(err => {
            console.log(err);
        });
    });
};
export default countries;

function selectOption(countries) {
    let select = $("#countries select");
    for (let i = 0; i < countries.length; i++) {
        let option = document.createElement("option");
        option.text = countries[i];
        select.append(option);
    }

    // select2 with bootstrap 5
    $("#countries select").select2({
        placeholder: "Select a country",
    });
}