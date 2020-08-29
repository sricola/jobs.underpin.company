var Table = Table || {};

Table = {
    init: function () {
        var csv_path = "https://docs.google.com/spreadsheets/d/1udba3EQtIfXOBuaLpCjQwokYyhP-MhO1f3risRaGUuY/gviz/tq?tqx=out:csv&tq=select%20A,B,C,D,E,F,G,H,I,J&gid=0";
        var element = "table-container";
        
        var table = $("<table class='table table-sm table-hover cards' width='100%' id='" + element + "-table'></table>");
        var containerElement = $("#" + element);
        
        containerElement.empty().append(table);
        
        $.when($.get(csv_path)).then(
            function (data) {
                
                var csvData = $.csv.toArrays(data);
                var tableHead = $("<thead id='thead'></thead>");
                var csvHeaderRow = csvData[0];
                var tableHeadRow = $("<tr></tr>");
                
                for (var header = 0; header < csvHeaderRow.length; header++) {
                    if (header == 9){
                        continue;
                    }
                    tableHeadRow.append($("<th></th>").text(csvHeaderRow[header]));
                }
                tableHead.append(tableHeadRow);
                
                table.append(tableHead);
                var tableBody = $("<tbody></tbody>");
                
                var dataLength = csvData.length;
                for (var row = 1; row < dataLength; row++) {
                    var tableBodyRow = $("<tr></tr>");
                    for (var col = 0; col < csvData[row].length; col++) {
                        var tableBodyRowTd = $("<td></td>");
                        
                        if (col == 8) {
                            tableBodyRowTd.html("<a href='" + csvData[row][col] + "' target='_blank'>Company Link</a> | <a href='" + csvData[row][col+1] + "' target='_blank'>Job Link</a>");
                            col++;
                        } 
                        else {
                            if ( col == 0 ){
                                tableBodyRowTd.html("<b>" + csvData[row][col] + "</b>");
                            }
                            else if ( col == 2 || col == 4 || col == 7 ){
                                tableBodyRowTd.text(csvData[0][col] + " : " + csvData[row][col]);
                            }
                            else{
                                tableBodyRowTd.text(csvData[row][col]);
                            }
                        }
                        tableBodyRow.append(tableBodyRowTd);
                        tableBody.append(tableBodyRow);
                    }
                }
                table.append(tableBody);
                
                oTable = table.DataTable({
                    paging: false,
                    responsive: true
                });
                
                $('#thead').hide();
                
                $('#search').keyup(function () {
                    oTable.search($(this).val()).draw();
                })
                
            });
            
        }
    };
