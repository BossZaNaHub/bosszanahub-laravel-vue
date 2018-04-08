$(document).ready(function() {
    $('#exist-id').change(function(event) {
        $('.edit-form').removeClass('animate');
        var data = $(this).val();
        $.get('api/role.php?id_staff=' + data + '&type=update', function(data) {
            console.log(data);
            if (data === undefined) {
                return false;
            } else {
                setTimeout(function() {
                    $('.edit-form').addClass('animate');
                }, 500);
                for (var i = 1; i <= Object.keys(data).length; i++) {
                    $('#edit-form').find('input[data-id="' + i + '"]').val("");
                    $('#edit-form').find('input[data-id="' + i + '"]').removeAttr('checked');
                    if (data[i] == "T") {
                        $('#edit-form').find('input[data-id="' + i + '"]').attr('checked', '');
                    } else if (i == 3) {
                        $('#edit-form').find('select[data-id="' + i + '"]').find('option:first').text(data[i]);
                        $('#edit-form').find('select[data-id="' + i + '"]').find('option:first').val(data.id);
                    } else {
                        $('#edit-form').find('input[data-id="' + i + '"]').val(data[i]);
                    }

                }
            }
        });
    });
    $('#new-id').change(function(event) {
        $('.create-form').removeClass('animate');
        var data = $(this).val();
        $.get('api/role.php?id_staff=' + data + '&type=new', function(data) {
            console.log(data);
            if (data === undefined) {
                return false;
            } else {
                setTimeout(function() {
                    $('.create-form').addClass('animate');
                }, 500);
                for (var i = 1; i <= Object.keys(data).length; i++) {
                    console.log(data[i], i);
                    $('#create-form').find('input[data-id="' + i + '"]').val('');
                    $('#create-form').find('input[data-id="' + i + '"]').val(data[i]);
                }
            }
        });
    });
    $(document).on('click', '.edit', function(event) {
        event.preventDefault();
        var btn = $(this);
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
            $('#edit-form').find('input.check').each(function(index, el) {
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
            var data = $('#edit-form').serializeObject();
            console.log(data);
            $.ajax({
                    url: 'function/role_cmd.php',
                    type: 'POST',
                    data: { data: data, type: 1 },
                })
                .done(function(msg) {
                    console.log(msg);
                    if (msg.status == 200) {
                        swal({
                            title: 'เสร็จสิ้น',
                            text: 'การบันทึกข้อมูลเสร็จสิ้น"',
                            type: 'success',
                        }).then(function() {
                            location.reload();
                        })
                    } else {
                        swal(
                            'ถูกยกเลิก',
                            msg.message,
                            'error'
                        )
                        btn.button('reset');
                    }
                    btn.button('reset');
                })
                .fail(function() {
                    btn.button('reset');
                })
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                btn.button('reset');
                swal(
                    'ถูกยกเลิก',
                    'ข้อมูลไม่ได้ถูกบันทึกเนื่องจากยกเลิก',
                    'error'
                )
            }
        });
    });
    $(document).on('click', '.new', function(event) {
        event.preventDefault();
        var btn = $(this);
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
            $('#create-form').find('input.check').each(function(index, el) {
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
            var data = $('#create-form').serializeObject();
            console.log(data);
            $.ajax({
                    url: 'function/role_cmd.php',
                    type: 'POST',
                    data: { data: data, type: 2 },
                })
                .done(function(msg) {
                    console.log(msg);
                    if (msg.status == 200) {
                        swal({
                            title: 'เสร็จสิ้น',
                            text: 'การบันทึกข้อมูลเสร็จสิ้น"',
                            type: 'success',
                        }).then(function() {
                            location.reload();
                        })
                    } else {
                        swal(
                            'ถูกยกเลิก',
                            msg.message,
                            'error'
                        )
                        btn.button('reset');
                    }
                    btn.button('reset');
                })
                .fail(function() {
                    btn.button('reset');
                })
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                btn.button('reset');
                swal(
                    'ถูกยกเลิก',
                    'ข้อมูลไม่ได้ถูกบันทึกเนื่องจากยกเลิก',
                    'error'
                )
            }
        });
    });
});