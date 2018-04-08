var searchList = new List('search', {
    valueNames: ['id-staff', 'name']
});
$(document).ready(function() {
    $(document).on('click', '.weekly_click', function(event) {
        event.preventDefault();
        var update = 0;
        var btn = $(this);
        var totalData = $('.form_test').length;
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
            $('.form_test').each(function(index, el) {
                var data = $(el).serializeObject();
                console.log(data);
                $.ajax({
                        url: 'function/week_cmd.php',
                        type: 'POST',
                        data: { data: data },
                    })
                    .done(function(res, stats) {
                        console.log(res, stats);
                        if (index === totalData - 1) {
                            // this is the last one
                            swal({
                                title: 'เสร็จสิ้น',
                                text: 'การบันทึกข้อมูลเสร็จสิ้น"',
                                type: 'success',
                            }).then(function() {
                                location.reload();
                            })

                        }
                    })
                    .fail(function(res, stats) {
                        swal("ล้มเหลว", "ไม่สามรถเชื่อมต่อเซิฟเวอร", "error");
                        window.scrollTo(0, 0);
                    })
                btn.button('reset');
            });
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                btn.button('reset');
                swal(
                    'ถูกยกเลิก',
                    'ข้อมูลไม่ได้ถูกบันทึกเนื่องจากยกเลิก',
                    'error'
                )
            }
        })
    });
});