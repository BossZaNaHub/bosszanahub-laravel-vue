var searchList = new List('searchTop', {
    valueNames: ['name', 'staffid', 'dept']
});
// var searchList = new List('search', {
//     valueNames: ['id-staff', 'name']
// });
var searchAfter = new List('searchBot', {
    valueNames: ['name', 'staffid', 'dept']
});
$(document).ready(function() {
    $('#datetimepicker1').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM-DD'
    });
    $('#datetimepicker2').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM'
    });
    $('.get-sort-list li > a').click(function(e) {
        $('.sort-list').text(this.innerHTML).append(' <span class="caret"></span>');
    });
    var previous;
    var day;
    $('.performance_click').click(function(evt) {
        var validate = true;
        var text = "";
        $('.input_performance').each(function(i, val) {
            var form = $(this).serialize();
            var date = $('#getDate').val();
            $.ajax({
                    url: 'personal_cmd.php',
                    type: 'POST',
                    data: { form: form, type: 1, date: date },
                })
                .done(function(res, stats, jqXHR) {
                    console.log(res, stats);
                    swal("Save Has Successfully !", "OK", "success");
                    window.scrollTo(0, 0);
                })
                .fail(function(res, stats) {
                    swal("Error !", "Something has worng", "error");
                    window.scrollTo(0, 0);
                })
            // }
        });
    });
    $('.reset_click').click(function(evt) {
        $('.input_performance').val("");
    });
    $('#tab-topic li').click(function(event) {
        var topic = $(this).text();
        $('#topic').text(topic);
        console.log(topic);
    });
    //Weekly 
    $('.input_week1 , .input_week2 , .input_week3 , .input_week4 ').each(function(index, el) {
        if ($(this).is(":checked")) {
            $(this).val("T");
        } else {
            $(this).val("F");
        }
        $(this).change(function(event) {
            if ($(this).is(":checked")) {
                $(this).val("T");
            } else {
                $(this).val("F");

            }
        });
    });

    $('.weekly_click').click(function(evt) {
        var update = 0;
        var btn = $(this);
        btn.button('loading');
        $('.form_test').each(function(index, el) {
            var data = $(this).serializeObject();
            var date = $('#getDate').val();
            console.log(data);
            update += 1;
            $.ajax({
                    url: 'personal_cmd.php',
                    type: 'POST',
                    data: { data: data, type: 2, date: date },
                })
                .done(function(res, stats) {
                    console.log(res, stats);
                    if (update >= 28) {
                        swal("Save Has Successfully !", "OK", "success");
                        window.scrollTo(0, 0);
                        btn.button('reset');
                    }
                })
                .fail(function(res, stats) {
                    swal("Error !", "Something has worng", "error");
                    window.scrollTo(0, 0);
                })
        });
    });

    // Time Attendance
    $('.time_click').click(function(event) {
        var update = 0;
        var btn = $(this);
        btn.button('loading');
        $('.form_time').each(function(index, el) {
            var attendance = $(this).serializeObject();
            var date = $('#getDate').val();
            //console.log(attendance);
            update += 1;
            $.ajax({
                    url: 'personal_cmd.php',
                    type: 'POST',
                    data: { attendance: attendance, type: 3, date: date },
                })
                .done(function(res, stats) {
                    console.log(res, stats);
                    //console.log("success");
                    if (update == 23) {
                        btn.button('reset');
                        swal("Save Has Successfully !", "OK", "success");
                        window.scrollTo(0, 0);
                    }
                })
                .fail(function() {
                    swal("Error !", "Something has worng", "error");
                    window.scrollTo(0, 0);
                })
        });
    });

    $('.come').each(function(index, el) {
        $(this).change(function(event) {
            var id = $(this).data('id');
            var come = $(this).val();
            $('.come[data-id="' + id + '"]').attr('value', come);
            console.log(come);
            if (come < 4) {
                $('.percent[data-id="' + id + '"]').text(Number(10));
                $('.percent_point[data-id="' + id + '"]').val(10);
            } else {
                $('.percent[data-id="' + id + '"]').text(Number(0));
                $('.percent_point[data-id="' + id + '"]').val(0);
            }
        });
    });
    // loadKPI();
    searchKPI();
    filterSearch();
});

// Serialize Object

function searchKPI() {
    $('#datetimepicker2').on('dp.change', function(e) {
        var date2 = $(this).find('#getDate2').val();
        console.log(name, date2);
        $.ajax({
            url: 'personal_cmd.php',
            type: 'POST',
            data: { type: 5, getNewDate: date2, name: name },
            success: function(res) {
                console.log(res);
                $('.table-row-fetch').find('td').remove();
                $.each(res, function(index, val) {
                    var row = '<tr>'
                    $.each(val, function(i, v) {
                        if (i == 'name') {
                            row += '<td class="name">' + v + '</td>';
                        } else if (i == 'id') {
                            row += '<td class="staffid">' + v + '</td>'
                        } else if (i == 'status') {
                            row += '<td colspan="8" class="text-center">' + v + '</td>'
                        } else if (i == 'dept') {
                            row += '<td class="dept">' + v + '</td>'
                        } else {
                            row += '<td>' + v + '</td>';
                        }
                    });
                    row += '</tr>';
                    $('.table-row-fetch').append(row);
                });
            }
        });
        $.ajax({
            url: 'personal_cmd.php',
            type: 'POST',
            data: { type: 6, getNewDate: date2, name: name, id_staff: id_staff },
            success: function(res) {
                console.log(res);
                $('.table-row-fetch-2').empty();
                $.each(res, function(index, val) {
                    var row = '<tr class="ff">'
                    $.each(val, function(i, v) {
                        if (i == 'name') {
                            row += '<td class="name-summy">' + v + '</td>';
                        } else if (i == 'id') {
                            row += '<td class="staff_id">' + v + '</td>'
                        } else if (i == 'status') {
                            row += '<td colspan="8" class="text-center">' + v + '</td>'
                        } else {
                            row += '<td>' + v + '</td>';
                        }
                    });
                    row += '</tr>';
                    $('.table-row-fetch').append(row);
                });
            }
        });
    });
    filterSearch();
}

// function loadKPI() {
//     $('a[href="#summary"]').click(function(event) {
//         var date = new Date();
//         var year = date.getFullYear();
//         // var month = date.getMonth();
//         var monthIndex = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
//         var showDate = date.getMonth() - 1;
//         var fullDate = year + '-' + (monthIndex[showDate]);
//         console.log(fullDate);
//         $('tr.ff').remove();
//         $.ajax({
//             url: 'personal_cmd.php',
//             type: "POST",
//             data: { type: 5, getNewDate: fullDate, name: name },
//             success: function(res) {
//                 console.log(res);
//                 $.each(res, function(index, val) {
//                     var row = '<tr class="ff">'
//                     $.each(val, function(i, v) {
//                         //console.log(v);
//                         if (i == 'name') {
//                             row += '<td class="name-summy">' + v + '</td>';
//                         } else if (i == 'id') {
//                             row += '<td class="staff_id">' + v + '</td>'
//                         } else if (i == 'status') {
//                             row += '<td colspan="8" class="text-center">' + v + '</td>'
//                         } else {
//                             row += '<td>' + v + '</td>';
//                         }
//                         // var text = "";
//                         // text += '<td>' + v.fname_th + ' ' + v.lname_th + ' ('+ v.title_th +')'+'</td>';
//                         // text += '<td>' + v.dept + '</td>';
//                         // text += '<td>' + v.A + '</td>';
//                         // text += '<td>' + v.P + '</td>';
//                         // text += '<td>' + v.K + '</td>';
//                         // $('.ff').append(text);
//                     });
//                     row += '</tr>';
//                     $('.table-row-fetch').append(row);
//                     // $('.fname').text(val.fname_th);
//                     //console.log(index);
//                 });
//             }
//         });
//         $.ajax({
//             url: 'personal_cmd.php',
//             type: 'POST',
//             data: { type: 6, getNewDate: fullDate, name: name, id_staff: id_staff },
//             success: function(res) {
//                 console.log(res);
//                 // $('.table-row-fetch-2').empty();
//                 $.each(res, function(index, val) {
//                     var row = '<tr class="ff">'
//                     $.each(val, function(i, v) {
//                         if (i == 'name') {
//                             row += '<td class="name-summy">' + v + '</td>';
//                         } else if (i == 'id') {
//                             row += '<td class="staff_id">' + v + '</td>'
//                         } else if (i == 'status') {
//                             row += '<td colspan="8" class="text-center">' + v + '</td>'
//                         } else {
//                             row += '<td>' + v + '</td>';
//                         }
//                     });
//                     row += '</tr>';
//                     $('.table-row-fetch').append(row);
//                 });
//             }
//         });
//     });
//     filterSearch();
// }

function filterSearch() {
    var searchSum = new List('search-sum', {
        valueNames: ['name', 'staffid', 'dept']
    });
}