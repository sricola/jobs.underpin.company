var Table = Table || {};

Table = {
    init: function () {
        var csv_path = 'https://docs.google.com/spreadsheets/d/1udba3EQtIfXOBuaLpCjQwokYyhP-MhO1f3risRaGUuY/gviz/tq?tqx=out:csv&tq=select%20A,B,C,D,E,F,G,H,I,J&gid=0';
        var element = "table-container";

        var table = $("<table class='display responsive nowrap' width='100%' id='" + element + "-table'></table>");
        var containerElement = $("#" + element);

        containerElement.empty().append(table);

        $.when($.get(csv_path)).then(
            function (data) {

                var csvData = $.csv.toArrays(data);
                var tableHead = $("<thead></thead>");
                var csvHeaderRow = csvData[0];
                var tableHeadRow = $("<tr></tr>");

                for (var header = 0; header < csvHeaderRow.length; header++) {
                    tableHeadRow.append($("<th></th>").text(csvHeaderRow[header]));
                }
                tableHead.append(tableHeadRow);

                table.append(tableHead);
                var tableBody = $("<tbody></tbody>");

                for (var row = 1; row < csvData.length; row++) {
                    var tableBodyRow = $("<tr></tr>");
                    for (var col = 0; col < csvData[row].length; col++) {
                        var tableBodyRowTd = $("<td></td>");

                        if (col == 8 || col == 9) {
                            tableBodyRowTd.html("<a href='" + csvData[row][col] + "' target='_blank'>" + csvData[row][col] + "</a>");
                        } else {
                            tableBodyRowTd.text(csvData[row][col]);
                        }
                        tableBodyRow.append(tableBodyRowTd);
                        tableBody.append(tableBodyRow);
                    }
                }
                table.append(tableBody);

                oTable = table.DataTable({
                    paging: false,
                    responsive: true,
                    columnDefs: [
                        { responsivePriority: 1, targets: 0 }
                    ]
                });


                $('#search').keyup(function () {
                    oTable.search($(this).val()).draw();
                })

            });

    }
};
