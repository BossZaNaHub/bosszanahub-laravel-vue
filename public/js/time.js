var searchList = new List('users', {
    valueNames: ['id-staff', 'name' ,'dept']
});
$(document).ready(function() {
    $('.time_click').click(function(event) {
        var update = 0;
        var btn = $(this);
        var totalData = $('.form_time').length;
        btn.button('loading');
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
            $('.form_time').each(function(index, el) {
                var attendance = $(this).serializeObject();
                $.ajax({
                        url: 'function/time_cmd.php',
                        type: 'POST',
                        data: { attendance: attendance },
                    })
                    .done(function(res, stats) {
                        console.log(res, stats);
                        if (index === totalData - 1) {
                            swal({
                                title: 'เสร็จสิ้น',
                                text: 'การบันทึกข้อมูลเสร็จสิ้น"',
                                type: 'success',
                            }).then(function() {
                                location.reload();
                            })
                        }
                    })
                    .fail(function() {
                        swal("ล้มเหลว", "ไม่สามรถเชื่อมต่อเซิฟเวอร", "error");
                        window.scrollTo(0, 0);
                    })
                btn.text('บันทึกข้อมูล');
                btn.button('reset');
            });
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                btn.text('บันทึกข้อมูล');
                btn.button('reset');
                swal(
                    'ถูกยกเลิก',
                    'ข้อมูลไม่ได้ถูกบันทึกเนื่องจากยกเลิก',
                    'error'
                )
            }
        })
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
});