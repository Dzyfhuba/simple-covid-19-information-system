import $ from 'jquery';
import API from '../API';
import ApexCharts from 'apexcharts';
import "bootstrap/dist/js/bootstrap.min";
import _ from 'lodash';
import 'datatables.net';
import "datatables.net-dt";

const dailies = () => {
    var dailies = $("article#dailies");
    var route = dailies.data("route");

    // get data from API
    const api = new API();
    api.getData(route).then(data => {
        // get name only of reportDate
        var reportDate = data.map(daily => daily.reportDate);
        selectReportDate(reportDate);
    }).catch(err => {});

    $("#dailies .select-daily").on("change select2:clear", () => {
        var selectedDate = $("#dailies .select-daily").val();
        console.log(selectedDate);
        var route = dailies.data("route") + "/" + selectedDate;

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
            console.log(data);
            $(".filler").hide();
            console.log("success");
            // create or update if already exist table
            var table = $("#dailies table");
            if (table.length == 0) {
                table = $("<table>").addClass("table table-striped table-bordered").attr("id", "dailiesTable");
                $("#dailies").append(table);

                // create table header
                var thead = $("<thead>");
                var tr = $("<tr>");
                var th = $("<th>").text("Country Region");
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
                var tbody = $("<tbody>");
                data.forEach(daily => {
                    var tr = $("<tr>");
                    var td = $("<td>").text(daily.countryRegion);
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
                var tbody = $("#dailies table tbody");
                tbody.empty();
                data.forEach(daily => {
                    var tr = $("<tr>");
                    var td = $("<td>").text(daily.countryRegion);
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
            var table = $("#dailies table");
            if (table.length > 0) {
                table.DataTable().destroy();
                table.remove();
            }
        });
    })

}

function selectReportDate(reportDate) {;
    var select = $("#dailies .select-daily");
    for (var i = 0; i < reportDate.length; i++) {
        var option = $("<option>").attr("value", reportDate[i]).text(reportDate[i]);
        select.append(option);
    }
    $("#dailies .select-daily").select2({
        placeholder: "Select a date",
        allowClear: true,
    });
}

export default dailies;