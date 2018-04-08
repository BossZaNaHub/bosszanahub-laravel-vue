var limit = 0;
var total = 0;
var currentFile = null;
Dropzone.options.myAwesomeDropzone = false;
Dropzone.autoDiscover = false;
$(document).ready(function() {
    limit = $('.limit').length;
    $(document).on('click', '#addmore', function(event) {
        $('.limit').last().after(panelAdd());
        limit = $('.limit').length;
        console.log("limit1", limit);
    });
    $(document).on('click', '.color-red', function(event) {
        // var value = $(this).data('value');
        var value = $(this).parent().find('.topic-value').text();
        var parent = $(this).parent();
        parent.find('.topic-value').text('');
        parent.find('.topic-value').append('<input type="text" class="form-control getText" placeholder="ใส่หัวข้อ" value="'+value+'">');
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
    $(document).on('click', '#edit', function(event) {
        $('.limit').find('.panel-body').after('<i class="glyphicon glyphicon-remove remove">');
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
        });
        $('#totalPoint').val(total);
    });
    $('#totalPoint').focusin(function(event) {
        var total = 0;
        $('.totalPoint').each(function(i, e) {
            total += parseFloat($(e).val());
        });
        $(this).val(total);
    });
    $(document).on('click', '.image_delete', function(event) {
        $('.image_drag').parent().parent().toggleClass("image_upload");
    });
    $(document).on('click', '.image_upload', function(event) {
        var getSerializeId = $(this).find('input[name="image_stock_id"]').val();
        var getSerializeFile = $(this).find('input[name="image_stock_name"]').val();
        // console.log(getSerializeFile,getSerializeId);
        swal({
            title: "Are you sure to delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!"
        }, function(isConfirm) {
            $.ajax({
                url: 'delete_cmd.php',
                type: 'POST',
                data: {getSerializeId: getSerializeId,getSerializeFile : getSerializeFile},
            })
            .done(function(res,stats) {
                console.log(res,stats);
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
        });
    });
    postAjaxData();
    returnCheckBlock();
    removeData();
    // dragToRemove();
    // postAjaxQmR();
    $("#lightgallery").lightGallery();
});

function panelAdd() {
    var text = "";
    text += '<div class="row limit">';
    text += '<div class="col-lg-12 col-sm-12">';
    text += '<div class="panel panel-default">';
    text += '<div class="panel-body">';
    text += '<form class="assessment">';
    text += '<p class="text-summary"><span>เกณฑ์การประเมิน : </span><span class="topic-value data' + limit + '">n/a</span><i class="glyphicon glyphicon-pencil color-red"></i></p>';
    text += '<input type="hidden" id="pbox" name="box">';
    text += '<input type="hidden" class="totalTopic" id="ptopic" name="topic">';
    text += '<input type="hidden" id="pid" name="id" value="' + id + '">';
    // text += '<input type="hidden" id="pdate" name="date" value="<?=$dateYM;?>">';
    // text += '<input type="hidden" id="pimage" name="image" value="' + generateImage + '">';
    text += '<div class="row">';
    text += '<div class="col-lg-3 col-sm-3 col-xs-6">';
    text += '<span class="text-lays">คะแนนเต็ม</span>';
    text += '<input type="email" class="form-control" id="pmax" name="max" placeholder="ใส่คะแนนเต็ม" maxlength="5">';
    text += '</div>';
    text += '<div class="col-lg-3 col-sm-3 col-xs-6">';
    text += '<span class="text-lays">คะแนนที่ได้</span>';
    text += '<input type="email" class="form-control totalPoint" id="ppoint" name="point" placeholder="ใส่คะแนนที่ได้" maxlength="5">';
    text += '</div>';
    text += '<div class="col-lg-6 col-sm-6 col-xs-12">';
    text += '<span class="text-lays">หมายเหตุ</span>';
    text += '<input type="email" class="form-control" id="pps" name="ps" placeholder="ใส่หมายเหตุ">';
    text += '</div>';
    text += '</div>';
    text += '</div>';
    text += '</form>';
    text += '</div>';
    text += '</div>';
    text += '</div>';

    return text;
}

function postAjaxData() {
    var update = 0;
    $('.btnSaveVisor').click(function(event) {
        var btn = $(this);
        console.log('clicked');
        var text = "";
        var header = "";
        var chk = true;
        var check;
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

            // console.log($(this).find('.totalPoint').val());
            if (!chk) {
                update = 0;
                btn.button('reset');
                swal("Error !", text, "error");
            } else {
                var totalPoint = $("#totalPoint").val();
                var totalId = $("#totalPointId").val();
                var data = $(this).serializeObject();
                $.ajax({
                        url: 'personalDetail_cmd.php',
                        type: 'POST',
                        data: { data: data, check: check, type: "supervisor", total: totalPoint, totalId: totalId },
                    })
                    .done(function(res, stats) {
                        console.log(res, stats);
                        update += 1;
                        if (update == limit) {
                            btn.button('loading');
                            swal({
                                title: "Save Has Successfully !",
                                text: "OK",
                                type: "success"
                            }, function(isConfirm) {
                                if (isConfirm) {
                                    window.location.href = "http://qualityplusintranet.com/kpi/";
                                }
                            });
                        }
                    })
                    .fail(function() {
                        swal("Error !", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                    })
            }
        });
    });
}

function removeData() {
    $(document).on('click', '.remove', function(e) {
        event.preventDefault();
        var parent = $(this).parent('.panel').find('.assessment');
        var first = $(this).parent().parent().parent();
        var data = parent.serializeObject();
        var totalId = $("#totalPointId").val();
        // console.log(first);
        swal({
            title: "Are you sure to delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!"
        }, function(isConfirm) {
            if (isConfirm) {
                $.ajax({
                        url: 'personalDetail_cmd.php',
                        type: 'POST',
                        data: { data: data, type: "delete", totalId: totalId },
                    })
                    .done(function(res, stats) {
                        console.log(res, stats);
                        first.fadeOut();
                        first.remove();
                        total = 0;
                        $('.totalPoint').each(function(i, e) {
                            total += parseFloat($(e).val());
                        });
                        $('#totalPoint').val(total);
                        limit = $('.limit').length;
                        console.log(limit);
                    })
                    .fail(function() {
                        swal("Error !", "ไม่สามารถเชื่อมต่อเซิฟเวอร์", "error");
                    })
            } else {

            }
        });
    });
}

function dragToRemove() {
    $('.image_drag').draggable();
    $('.toRemove').droppable({
        drop: function(evt, ui) {
            console.log("Remove it");
        }
    })
}

function returnCheckBlock() {
    $('input.plan').on('change', function(event) {
        event.preventDefault();
        $('input.plan').not(this).prop('checked', false);
    });
}

$(function() {
    var myDropzone = new Dropzone(".dropzone", {
        addRemoveLinks: true,
        acceptedFiles: "image/*,application/pdf,.xlsx",
        dictDefaultMessage: "Drop files here to upload (Maximum size is 10MB and PDF IMAGE XLSX type)",
        removedfile: function(file) {
            var name = file.name;
            $.ajax({
                    url: 'delete_cmd.php',
                    type: 'POST',
                    data: "name=" + name,
                })
                .done(function(res, stats) {
                    console.log(res, stats);
                })
                .fail(function() {
                    console.log("error");
                })
            var _ref;
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        }
    });
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};