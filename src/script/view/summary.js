import API from "../API";
import ApexCharts from "apexcharts";
import $ from "jquery";
const summary = () => {
    const api = new API();
    const summary = $("article#summary");
    const route = summary.data("route");
    // get data from API
    api.getData(route).then(data => {
        const options = {
            series: [data.confirmed.value, data.recovered.value, data.deaths.value],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: ["Confirmed", "Recovered", "Deaths"],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }],
            // legend style
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                verticalAlign: "middle",
                floating: false,
                fontSize: "14px",
                offsetX: 0,
                offsetY: 0,
                labels: {
                    useSeriesColors: true
                }
            }
        };
        const summaryChart = new ApexCharts(document.querySelector("#summaryChart"), options);
        summaryChart.render();
    }).catch(err => {
        console.log(err);
    });

    // set "https://covid19.mathdro.id/api/og" to src of img tag
    $("#summary img").attr("src", "https://covid19.mathdro.id/api/og");
};
export default summary;