import API from '../API';
import ApexCharts from 'apexcharts';
import $ from 'jquery';
const summary = () => {
    var api = new API();
    var summary = $("article#summary");
    var route = summary.data("route");
    // get data from API
    api.getData(route).then(data => {
        var options = {
            series: [data.confirmed.value, data.recovered.value, data.deaths.value],
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Confirmed', 'Recovered', 'Deaths'],
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
        };
        var summaryChart = new ApexCharts(document.querySelector("#summaryChart"), options);
        summaryChart.render();
    }).catch(err => {
        console.log(err);
    });
}
export default summary;