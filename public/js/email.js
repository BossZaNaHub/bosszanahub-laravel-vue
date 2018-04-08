var searchList = new List('email', {
    valueNames: ['name', 'dept', 'email']
});
$(document).ready(function() {
    $('.datetimepicker').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM'
    }).on('dp.change', function(e) {
        var date = $('#getDate2').val();
        window.location.href = '/email?date=' + date;

    });
    $('input[id*="chkAll"]:checkbox').click(function() {
        $('input[id*="chkItem"]:checkbox').attr('checked', $(this).is(':checked'));
    });
    $('.email-click').on('click', function(evt) {
        var date = $('#getDate2').val();
        swal({
            title: 'คุณแน่ใจที่จะทำการส่ง',
            text: "ข้อมูลที่คุณติ๊กจะถูกส่ง",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            confirmButtonClass: 'btn btn-success mr10',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function() {
            $('table.table').find('tr').each(function(index, el) {
                var form = $(this).find('input').serializeObject();
                console.log(form, date);
                $.ajax({
                        url: 'send_mail.php',
                        type: 'POST',
                        data: { data: form, date: date }
                    })
                    .done(function(res, stats) {
                        console.log(res, stats);
                        $(el).find('.text-center .glyphicon').addClass('text-success');
                        swal("สำเร็จ", "ส่งข้อมูลสำเร็จ", "success");
                    })
                    .fail(function() {
                        swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                    })
            });
        }, function(dismiss) {
            if (dismiss == "cancel") {
                swal("ล้มเหลว", "การส่งถูกยกเลิก", "error");
            }
        });
    });
    $(document).on('click', '.envelope-send', function(event) {
        event.preventDefault();
        var elm = $(this);
        var data = $(this).parent().parent().parent().find('.form_email').serializeObject();
        console.log(a, data);
        swal({
            title: 'คุณแน่ใจที่จะทำการบันทึก?',
            text: "ข้อมูลที่คุณกรอกจะถูกบันทึก",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            confirmButtonClass: 'btn btn-success mr10',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function() {
            var email = elm.parent().parent().find('.email');
            $.ajax({
                    url: 'single_send_email.php',
                    type: 'default GET (Other values: POST)',
                    dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    data: { param1: 'value1' },
                })
                .done(function() {
                    console.log("success");
                })
            elm.css('color', 'green');
        }, function(dismiss) {
            if (dismiss == "cancel") {
                swal("ล้มเหลว", "การส่งถูกยกเลิก", "error");
            }
        });
    });
    searchKPI();
});

function checkBox() {
    $('.allbox').toggle(function() {
        console.log("check");
        $('input:checkbox').attr('checked', 'checked');
    }, function() {
        $('input:checkbox').removeAttr('checked');
    });
}

function searchKPI() {
    $('#datetimepicker1').on('dp.change', function(e) {
        var date = $(this).find('#getDate').val();
        console.log(date);
        $.ajax({
            url: 'email_cmd.php',
            type: 'POST',
            data: { getNewDate: date },
            success: function(res) {
                $('.table-row-fetch').empty();
                $.each(res, function(index, val) {
                    var row = '<tr class="form_email">';
                    // row += '<form class="form_email">';
                    row += '<td scope="row"><input type="checkbox" name="chkitem" id="chkItem"></td>';
                    row += '<input type="hidden" name="kpi" value="' + val["kpi point"] + '" />';
                    row += '<input type="hidden" name="email" value="' + val["email"] + '" />';
                    $.each(val, function(i, v) {
                        row += '<td>' + v + '</td>';
                    });
                    row += '<td class="center"><i class="glyphicon glyphicon-envelope"></i></td>';
                    // row += '</form>';
                    row += '</tr>';
                    $('.table-row-fetch').append(row);
                });
            }
        });
    });
}