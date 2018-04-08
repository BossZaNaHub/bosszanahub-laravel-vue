var limit = 0;
var total = 0;
var currentFile = null;
var update = 0;
// Dropzone.options.myAwesomeDropzone = false;
Dropzone.options.imageupload1 = { // The camelized version of the ID of the form element

    // The configuration we've talked about above
    // url: 'function/upload_file_cmd.php',
    autoProcessQueue: false,
    addRemoveLinks: true,
    parallelUploads: 10000,
    acceptedFiles: "image/*,application/pdf,.xlsx",
    dictDefaultMessage: "ลากและวางไฟล์ที่นี้ (ไฟล์ไม่เกิน 10MB เฉพาะไฟล์ JPG PNG PDF XLSX)",

    // The setting up of the dropzone
    init: function() {
        var myDropzone = this;
        var imageId = uniqueNumber();
        var imageGenId = randomString(10);

        // Here's the change from enyo's tutorial...

        $(".btnSaveVisor").click(function(e) {
            // e.preventDefault();
            // e.stopPropagation();
            myDropzone.processQueue();
        });

        $(".btnSaveQMR").click(function(e) {
            myDropzone.processQueue();
        });

        this.on("queuecomplete", function(response) {
            console.log(response);
        });

        this.on("sending", function(file, xhr, data) {
            // data.append("imageGenId", imageGenId);

        });

        this.on("success", function(file, response) {
            console.log(file, response);
        });
    }

}

$(document).ready(function() {
    limit = $('.limit').length;
    // console.log("limit0", limit);
    $(document).on('click', '.addmore', function(event) {
        var dataID = $(this).data('id');
        var clone = $(this).parent().parent().parent().find('.addnew').first().clone().find('input:text').val("").end();
        $(this).parent().parent().parent().find('.addnew').last().after(clone);
        $(this).parent().parent().parent().find('.addnew').last().find('.assessment').addClass('new');
        if (clone.length == 0) {
            console.log('add');
            $(this).parent().parent().parent().find('.row').last().after(panelAdd2(dataID));
        }
    });
    $(document).on('click', '.color-red', function(event) {
        var value = $(this).parent().find('.topic-value').text();
        var parent = $(this).parent();
        parent.find('.topic-value').text("");
        parent.find('.topic-value').append('<input type="text" class="form-control getText" placeholder="ใส่หัวข้อ" value="' + value + '">');
        $(this).removeClass('glyphicon-pencil color-red');
        $(this).addClass('glyphicon-ok color-green');
    });
    $(document).on('click', '.color-green', function(event) {
        var parent = $(this).parent();
        var value = parent.find('input').val();
        parent.find('.topic-value').text(value);
        parent.parent().find('input#ptopic').val(value);
        $(this).remove('input');
        $(this).removeClass('glyphicon-ok color-green');
        $(this).addClass('glyphicon-pencil color-red');
    });
    $(document).on('click', '.edit', function(event) {
        // console.log($(this).parent().parent());
        $(this).parent().parent().parent().find('.addnew').prepend('<i class="glyphicon glyphicon-trash remove">');
        $(this).html('<i class="glyphicon glyphicon-chevron-left"></i>');
        $(this).find('i.glyphicon').after(' BACK');
        $(this).attr('id', 'back');
    });
    $(document).on('click', '#back', function(event) {
        $('.limit').find('.remove').remove();
        $(this).html('<i class="glyphicon glyphicon-trash"></i>');
        $(this).find('i.glyphicon').after(' DELETE');
        $(this).attr('id', 'edit');
    });
    $(document).on('focusout', '.totalPoint', function(event) {
        total = 0;
        $('.totalPoint').each(function(i, e) {
            total += parseFloat($(e).val());
            // console.log(total);
            $('#totalPoint').val(total);
        });
        $('#totalPoint').val(total);
    });
    $('#totalPoint').focusin(function(event) {
        total = 0;
        $('.totalPoint').each(function(i, e) {
            total += parseFloat($(e).val());
        });
        $(this).val(total);
    });
    $(document).on('click', '.image_delete', function(event) {
        $('.image_drag').parent().parent().toggleClass("image_upload");

    });
    $(document).on('click', '.image_new', function(event) {
        $(this).parent().parent().find('.new-dropzone').toggleClass('hidden');
        if ($(this).parent().parent().find('.new-dropzone').hasClass('hidden')) {
            $(this).button("reset");
        } else {
            $(this).button("somestringvalue");
        }
    });
    $(document).on('click', '.image_upload', function(event) {
        var element = $(this);
        var getSerializeId = $(this).find('input[name="image_stock_id"]').val();
        var getSerializeFile = $(this).find('input[name="image_stock_name"]').val();
        swal({
            title: 'คุณแน่ใจที่จะทำการลบรูป?',
            text: "ลบรูปหรือไม่",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบรูป',
            cancelButtonText: 'ยกเลิก',
            confirmButtonClass: 'btn btn-success mr10',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function() {
            $.ajax({
                    url: 'delete_cmd.php',
                    type: 'POST',
                    data: { id: getSerializeId, file: getSerializeFile },
                })
                .done(function() {
                    element.fadeOut();
                })
                .fail(function() {
                    swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                })
        }, function(dismiss) {
            if (dismiss == "cancel") {
                swal("ล้มเหลว", "ถูกยกเลิก", "error");
            }
        });
        // swal({
        //     title: "Are you sure to delete ?",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "Yes, Delete it!"
        // }, function(isConfirm) {
        //     $.ajax({
        //             url: 'delete_cmd.php',
        //             type: 'POST',
        //             data: { getSerializeId: getSerializeId, getSerializeFile: getSerializeFile },
        //         })
        //         .done(function(res, stats) {
        //             console.log(res, stats);
        //             console.log("success");
        //         })
        //         .fail(function() {
        //             console.log("error");
        //         })
        // });
    });
    postAjaxQmR();
    postAjaxQmrData();
    // dropzoneFile();
    returnCheckBlock();
    removeData();
    $("#lightgallery").lightGallery();
    $("#lightGallery").on('onSlideClick.lg', function(evt) {
        // console.log('click');
    });
});

// function cloneForm(){

// }

function panelAdd2(type) {
    var topic = "";
    if (type == 0) {
        topic = "ROUTINE";
        tid = 10000;
    } else if (type == 1) {
        topic = "MISSION";
        tid = 10001;
    } else {
        topic = "SPECIAL";
        tid = 10002;
    }
    var text = '';
    text += '<div class="addnew">';
    text += '<form class="assessment new">';
    text += '<div class="row">';
    text += '<div class="col-md-6 col-md-offset-3 text-center">';
    text += '<input type="hidden" name="topic_id" value="' + tid + '">';
    text += '<div class="form-group">';
    text += '<label class"text-summary">เรื่องประเมิน</label><input class="form-control" type="text" name="topic-value" placeholder="ใส่รายละเอียดหัวข้อการประเมิน">';
    text += '</div></div></div>';
    text += '<div class="row">';
    text += '<input type="hidden" id="pid" name="id" value="' + id + '">';
    text += '<input type="hidden" id="pbox" name="perf_point_id" value="' + perf_point_id + '">';
    text += '<div class="col-lg-3 col-sm-3 col-xs-6 text-center"><div class="form-group">';
    text += '<span class="text-lays">คะแนนเต็ม</span>';
    text += '<input type="email" class="form-control maxPoint" id="pmax" name="max" placeholder="ใส่คะแนนเต็ม" value="0" maxlength="5" onkeypress="return isNumberKey(event)">';
    text += '</div></div>';
    text += '<div class="col-lg-3 col-sm-3 col-xs-6 text-center"><div class="form-group">';
    text += '<span class="text-lays">คะแนนที่ได้</span>';
    text += '<input type="email" class="form-control totalPoint" id="ppoint" name="point" placeholder="ใส่คะแนนที่ได้" value="0" maxlength="5" onkeypress="return isNumberKey(event)">';
    text += '</div></div>';
    text += '<div class="col-lg-6 col-sm-6 col-xs-12 text-center"><div class="form-group">';
    text += '<span class="text-lays">หมายเหตุ</span>';
    text += '<input type="email" class="form-control" id="pps" name="ps" placeholder="ใส่หมายเหตุ">';
    text += '</div></form></div>';
    return text;
}

// function panelAdd() {
//     var beforeLimit = limit;
//     limit += 1;
//     var text = "";
//     text += '<div class="row limit">';
//     text += '<div class="col-lg-12 col-sm-12">';
//     text += '<div class="panel panel-default">';
//     text += '<div class="panel-body">';
//     text += '<form class="assessment">';
//     text += '<div class="row">';
//     text += '<div class="col-md-6 text-center">';
//     text += '<div class="form-group">';
//     text += '<label class"text-summary">เกณฑ์การประเมิน</label><input class="form-control" type="text" name="topic" readonly value="OTHER">';
//     text += '<input type="hidden" name="topic" value="10003"></div></div>';
//     text += '<div class="col-md-6 text-center">';
//     text += '<div class="form-group">';
//     text += '<label class"text-summary">เรื่องประเมิน</label><input class="form-control" type="text" name="topic-value" placeholder="ใส่รายละเอียดหัวข้อการประเมิน">';
//     text += '</div></div></div>';
//     text += '<div class="row">';
//     text += '<input type="hidden" id="pid" name="id" value="' + id + '">';
//     text += '<div class="col-lg-3 col-sm-3 col-xs-6 text-center"><div class="form-group">';
//     text += '<span class="text-lays">คะแนนเต็ม</span>';
//     text += '<input type="email" class="form-control maxPoint" id="pmax" name="max" placeholder="ใส่คะแนนเต็ม" value="0" maxlength="5" onkeypress="return isNumberKey(event)">';
//     text += '</div></div>';
//     text += '<div class="col-lg-3 col-sm-3 col-xs-6 text-center"><div class="form-group">';
//     text += '<span class="text-lays">คะแนนที่ได้</span>';
//     text += '<input type="email" class="form-control totalPoint" id="ppoint" name="point" placeholder="ใส่คะแนนที่ได้" value="0" maxlength="5" onkeypress="return isNumberKey(event)">';
//     text += '</div></div>';
//     text += '<div class="col-lg-6 col-sm-6 col-xs-12 text-center"><div class="form-group">';
//     text += '<span class="text-lays">หมายเหตุ</span>';
//     text += '<input type="email" class="form-control" id="pps" name="ps" placeholder="ใส่หมายเหตุ">';
//     text += '</div></div>';
//     text += '</div>';
//     text += '</form>';
//     text += '<div class="clearfix"></div>';
//     text += '<div class="row"><div class="col-md-12">';
//     text += '<form action="function/upload_file_cmd.php" method="post" id="imageupload1" enctype="multipart/form-data" class="dropzone">';
//     text += '<input type="hidden" name="staff_id" value="' + id + '">';
//     text += '<input type="hidden" name="image_id" value="' + randomString(10) + '">'
//     text += '<div class="fallback"><input type="file" name="file"></div>';
//     text += '</form></div></div>';
//     text += '</div>';
//     text += '</div>';
//     text += '</div>';
//     return text;

// }

$('.btnSaveVisor').click(function(event) {
    var btn = $(this);
    var text = "";
    var header = "";
    var chk = true;
    var check;
    var totalPoint = $("#totalPoint").val();
    btn.button('loading');
    if ($('.plan:checked').length > 0) {
        if ($('#planA').is(':checked')) {
            check = 1;
        }
        if ($('#planB').is(':checked')) {
            check = 2;
        }
    } else {
        text = "กรุณาเลือกสถานะ";
        chk = false;
    }

    if ($('#totalPoint').val() == "" || $('#totalPoint').val() === undefined) {
        text = "กรุณาเช็คคะแนนรวมอีกครั้ง";
        chk = false;
    }

    if ($('#totalPoint').val() > 80) {
        text = "กรุณาเช็คคะแนนรวมอีกครั้ง";
        chk = false;
    }

    $('.assessment').each(function(index, el) {
        if ($(this).find('.maxPoint').val() == "" || $(this).find('.totalPoint').val() == "") {
            text = "กรุณากรอกคะแนน";
            // swal("Error !", "กรุณากรอกคะแนน", "error");
            chk = false;
        }

        if (parseFloat($(this).find('.maxPoint').val()) > 80) {
            // swal("Error !", "คะแนนเต็มต้องไม่เกิน 80 คะแนน", "error");
            text = "คะแนนเต็มต้องไม่เกิน 80 คะแนน";
            chk = false;
        }

        if (parseFloat($(this).find('.totalPoint').val()) > parseFloat($(this).find('.maxPoint').val())) {
            // swal("Error !", "คะแนนที่ได้ต้องเท่ากับหรือน้อยกว่าคะแนนเต็ม", "error");
            text = "คะแนนที่ได้ต้องเท่ากับหรือน้อยกว่าคะแนนเต็ม";
            chk = false;
        }

        if ($(this).find('.totalTopic').val() == "") {
            // swal("Error !", "กรุณากรอก เกณฑ์การประเมิน", "error");
            text = "กรุณากรอก เกณฑ์การประเมิน";
            chk = false;
        }

        if ($(this).find('.topicvalue').val() == "") {
            text = "กรุณากรอก เรื่องการประเมิน";
            chk = false;
        }
    });
    if (!chk) {
        swal("ล้มเหลว", text, "error");
        btn.button('reset');
    } else {
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
            $('.assessment').each(function(index, el) {
                var totalId = $("#totalPointId").val();
                var data = $(this).serializeObject();
                // var imageGenId = $(this).parent().find('.dropzone').find('input[name=image_id]').val();
                console.log(totalId, data, totalPoint,check);
                btn.button('reset');
                $.ajax({
                        url: 'personalDetail_cmd.php',
                        type: 'POST',
                        data: { data: data, check: check, type: "supervisor", totalId: totalId },
                    })
                    // .done(function(res, stats) {
                    //     console.log(res);
                    //     swal({
                    //         title: "สำเร็จ",
                    //         text: "การบันทึกเสร็จสิ้น",
                    //         type: "success"
                    //     }, function(isConfirm) {
                    //         if (isConfirm) {
                    //             btn.button('reset');
                    //         }
                    //     });
                    // })
                    .fail(function(res, stats) {
                        btn.button('reset');
                        swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                    })
            });
            var formTotal = $('#totalForm').serializeObject();
            $.ajax({
                    url: 'personalDetail_cmd.php',
                    type: 'POST',
                    data: { totalData: formTotal, type: 'totalpoint' },
                })
                .done(function(res, stats) {
                    console.log(res);
                    swal({
                        title: "สำเร็จ",
                        text: "การบันทึกเสร็จสิ้น",
                        type: "success"
                    }, function(isConfirm) {
                        if (isConfirm) {
                            btn.button('reset');
                            window.location.href = window.history.back();
                        }
                    });
                })
                .fail(function(res, stats) {
                    btn.button('reset');
                    swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
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
    }
});

function postAjaxQmR() {
    $('.btnSaveHuman').click(function(event) {
        var btn = $(this);
        var check;
        var chk = true;
        var text = "";
        var comment = $('#comment').val();
        var idQMR = $('#idQMR').val();
        var refQMR = $('#refQMR').val();
        btn.button('loading');
        if ($('.status:checked').length > 0) {
            if ($('#pcheckA').is(':checked')) {
                check = 1;
            }
            if ($('#pcheckB').is(':checked')) {
                check = 2;
            }
        } else {
            text = "กรุณาเลือกสถานะ";
            chk = false;
        }

        if (!chk) {
            swal("ล้มเหลว", text, "error");
            btn.button('reset');
        } else {
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
                $.ajax({
                        url: 'personalDetail_cmd.php',
                        type: 'POST',
                        data: { comment: comment, check: check, id: id, idQMR: idQMR, ref: refQMR, type: "qmr" },
                    })
                    .done(function(res, stats) {
                        btn.button('reset');
                        console.log(res, stats);
                        swal({
                            title: "สำเร็จ",
                            text: "การบันทึกเสร็จสิ้น",
                            type: "success"
                        }, function(isConfirm) {
                            if (isConfirm) {
                                window.location.href = "http://qualityplusintranet.com/kpi/personal";
                            }
                        });
                    })
                    .fail(function() {
                        swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                    })
            }, function(dismiss) {
                if (dismiss == "cancel") {
                    swal("ล้มเหลว", "การบันทึกถูกยกเลิก", "error");
                }
            })
        }
    });
}

function postAjaxQmrData() {
    $('.btnSaveQMR').click(function(event) {
        var btn = $(this);
        var text = "";
        var header = "";
        var chk = true;
        var check;
        var checkQMR;
        var idQMR = $('#idQMR').val();
        var refQMR = $('#refQMR').val();
        var comment = $('#comment').val();

        btn.button('loading');

        if ($('.plan:checked').length > 0) {
            if ($('#planA').is(':checked')) {
                check = 1;
            }
            if ($('#planB').is(':checked')) {
                check = 2;
            }
        } else {
            text = "กรุณาเลือกแผน";
            chk = false;
        }

        if ($('.status:checked').length > 0) {
            if ($('#pcheckA').is(':checked')) {
                checkQMR = 1;
            }
            if ($('#pcheckB').is(':checked')) {
                checkQMR = 2;
            }
        } else {
            text = "กรุณาเลือกสถานะ";
            chk = false;
        }

        if ($('#totalPoint').val() == "" || $('#totalPoint').val() === undefined) {
            text = "กรุณาเช็คคะแนนรวมอีกครั้ง";
            chk = false;
        }

        if ($('#totalPoint').val() > 80) {
            text = "กรุณาเช็คคะแนนรวมอีกครั้ง";
            chk = false;
        }


        $('.assessment').each(function(index, el) {
            if ($(this).find('.maxPoint').val() == "" || $(this).find('.totalPoint').val() == "") {
                text = "กรุณากรอกคะแนน";
                chk = false;
            }

            if (parseFloat($(this).find('.maxPoint').val()) > 80) {
                text = "คะแนนเต็มต้องไม่เกิน 80 คะแนน";
                chk = false;
            }

            if (parseFloat($(this).find('.totalPoint').val()) > parseFloat($(this).find('.maxPoint').val())) {
                text = "คะแนนที่ได้ต้องเท่ากับหรือน้อยกว่าคะแนนเต็ม";
                chk = false;
            }

            if ($(this).find('.totalTopic').val() == "") {
                text = "กรุณากรอก เกณฑ์การประเมิน";
                chk = false;
            }

            if (!chk) {
                swal("ล้มเหลว", text, "error");
                btn.button('reset');
            } else {
                swal({
                    title: 'คุณแน่ใจที่จะทำการบันทึก',
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
                    $('.assessment').each(function(index, el) {
                        var totalId = $("#totalPointId").val();
                        var data = $(this).serializeObject();
                        console.log(data, totalId);
                        $.ajax({
                                url: 'personalDetail_cmd.php',
                                type: 'POST',
                                data: { data: data, check: check, type: "supervisor", totalId: totalId },
                            })
                            .done(function(res, stats) {
                                console.log(res, stats);
                            })
                            .fail(function() {
                                swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                            })
                    });
                    $.ajax({
                            url: 'personalDetail_cmd.php',
                            type: 'POST',
                            data: { comment: comment, check: checkQMR, id: id, idQMR: idQMR, ref: refQMR, type: "qmr" },
                        })
                        .done(function(res, stats) {
                            console.log(res, stats);
                        })
                        .fail(function() {
                            swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                        })
                    var formTotal = $('#totalForm').serializeObject();
                    $.ajax({
                            url: 'personalDetail_cmd.php',
                            type: 'POST',
                            data: { totalData: formTotal, type: 'totalpoint' },
                        })
                        .done(function(res, stats) {
                            console.log(res);
                            swal({
                                title: "สำเร็จ",
                                text: "การบันทึกเสร็จสิ้น",
                                type: "success"
                            }).then(function() {
                                btn.button('reset');
                                window.location.href = '/personal';
                            });
                        })
                        .fail(function(res, stats) {
                            btn.button('reset');
                            swal("ล้มเหลว", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                        })
                }, function(dismiss) {
                    if (dismiss == "cancel") {
                        swal("ล้มเหลว", "การบันทึกถูกยกเลิก", "error");
                    }
                })
                btn.button('reset');
            }
        });
    });
}

function removeData() {
    $(document).on('click', '.remove', function(e) {
        e.preventDefault();
        var thisParent = $(this).parent();
        var parent = $(this).parent().find('.assessment');
        var first = $(this).parent().parent().parent();
        var data = parent.serializeObject();
        var totalId = $("#totalPointId").val();
        console.log(data);
        console.log(first.find('.addnew').length);
        if (parent.hasClass('new')) {
            $(this).parent().fadeOut(1000, function() {
                $(this).remove();
            });
        } else {
            if ((first.find('.addnew').length) == 1) {
                swal("ล้มเหลว", "ข้อมูลแต่ละหัวข้ออย่างน้อยต้องมี 1 ชนิด", "error");
            } else {
                swal({
                    title: 'คุณแน่ใจที่จะทำการลบข้อมูล?',
                    text: "ข้อมูลที่คุณกรอกจะถูกลบออก",
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
                    $.ajax({
                            url: 'personalDetail_cmd.php',
                            type: 'POST',
                            data: { data: data, type: "delete" },
                        })
                        .done(function(res, stats) {
                            console.log(res, stats);
                            thisParent.fadeOut(1000, function() {
                                thisParent.remove();
                            });
                            total = 0;
                            $('.totalPoint').each(function(i, e) {
                                total += parseFloat($(e).val());
                            });
                            $('#totalPoint').val(total);
                            limit = $('.limit').length;
                        })
                        .fail(function() {
                            swal("Error !", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                        })
                }, function(dismiss) {
                    if (dismiss == "cancel") {
                        swal("ล้มเหลว", "การลบถูกยกเลิก", "error");
                    }
                });
            }
        }
        // swal({
        //     title: "Are you sure to delete ?",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "Yes, Delete it!"
        // }, function(isConfirm) {
        // if (isConfirm) {
        //     
        // } else {

        // }
    });
}

function returnCheckBlock() {
    $('input.plan').on('change', function(event) {
        event.preventDefault();
        $('input.plan').not(this).prop('checked', false);
    });
    $('input.status').on('change', function(event) {
        event.preventDefault();
        $('input.status').not(this).prop('checked', false);
    });
}