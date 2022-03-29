import $ from 'jquery';
import API from '../API';
import ApexCharts from 'apexcharts';
import "bootstrap/dist/js/bootstrap.min";
import _ from 'lodash';
import 'datatables.net';
import "datatables.net-dt";

const dailies = () => {
    let dailies = $("article#dailies");
    let route = dailies.data("route");

    // get data from API
    const api = new API();
    api.getData(route).then(data => {
        // get name only of reportDate
        let reportDate = data.map(daily => daily.reportDate);
        selectReportDate(reportDate);
    }).catch(err => {});

    $("#dailies .select-daily").on("change select2:clear", () => {
        let selectedDate = $("#dailies .select-daily").val();
        let route = dailies.data("route") + "/" + selectedDate;

        // get data from API
        api.getData(route).then(data => {
            // replace on "deaths" key with 0 if data is null or ""
            data.forEach(daily => {
                if (daily.deaths == null || daily.deaths == "") {
                    daily.deaths = 0;
                }
                if (daily.recovered == null || daily.recovered == "") {
                    daily.recovered = 0;
                }
            });
            $(".filler").hide();
            // create or update if already exist table
            let table = $("#dailies table");
            if (table.length == 0) {
                table = $("<table>").addClass("table table-striped table-bordered").attr("id", "dailiesTable");
                $("#dailies").append(table);

                // create table header
                let thead = $("<thead>");
                let tr = $("<tr>");
                let th = $("<th>").text("Country Region");
                tr.append(th);
                th = $("<th>").text("Province State");
                tr.append(th);
                th = $("<th>").text("Confirmed");
                tr.append(th);
                th = $("<th>").text("Recovered");
                tr.append(th);
                th = $("<th>").text("Deaths");
                tr.append(th);
                thead.append(tr);
                table.append(thead);

                // create table body
                let tbody = $("<tbody>");
                data.forEach(daily => {
                    let tr = $("<tr>");
                    let td = $("<td>").text(daily.countryRegion);
                    tr.append(td);
                    td = $("<td>").text(daily.provinceState);
                    tr.append(td);
                    td = $("<td>").text(daily.confirmed);
                    tr.append(td);
                    td = $("<td>").text(daily.recovered);
                    tr.append(td);
                    td = $("<td>").text(daily.deaths);
                    tr.append(td);
                    tbody.append(tr);
                });
                table.append(tbody);
                table.DataTable();
            } else {
                // update table body
                let tbody = $("#dailies table tbody");
                tbody.empty();
                data.forEach(daily => {
                    let tr = $("<tr>");
                    let td = $("<td>").text(daily.countryRegion);
                    tr.append(td);
                    td = $("<td>").text(daily.provinceState);
                    tr.append(td);
                    td = $("<td>").text(daily.confirmed);
                    tr.append(td);
                    td = $("<td>").text(daily.recovered);
                    tr.append(td);
                    td = $("<td>").text(daily.deaths);
                    tr.append(td);
                    tbody.append(tr);
                });
                table.DataTable().destroy();
                table.DataTable();
            }

        }).catch(err => {
            console.log(err);
            $(".filler").show();
            // remove table
            let table = $("#dailies table");
            if (table.length > 0) {
                table.DataTable().destroy();
                table.remove();
            }
        });
    })

}

function selectReportDate(reportDate) {;
    let select = $("#dailies .select-daily");
    for (let i = 0; i < reportDate.length; i++) {
        let option = $("<option>").attr("value", reportDate[i]).text(reportDate[i]);
        select.append(option);
    }
    $("#dailies .select-daily").select2({
        placeholder: "Select a date",
        allowClear: true,
    });
}

export default dailies;