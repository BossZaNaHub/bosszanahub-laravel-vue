$(document).ready(function() {
    $('#datetimepicker1').datetimepicker({
        format: 'Y-MM'
    })
    $('#title').on('keyup', function(event) {
        event.preventDefault();
        $('#get-title').text($(this).val())
    });
    removeTopic()
});

function removeTopic() {
    $('.removeTopic').on('click', function(event) {
        event.preventDefault();
        var remove = $(this).parents('.topic').fadeOut('400', function() {
            remove.remove()
        })
    });
}

function removeAllTopic() {
	var remove = $('tbody tr.topic')
	if (remove.length == 0){
		var text = "ลบรายการทั้งหมดแล้ว"
		$('.alert').append(text).show()
	}
    remove.fadeOut('400', function() {
        remove.remove()
    })
}

function clearTopic() {
    $('.clearTopic').on('click', '.selector', function(event) {
        event.preventDefault();
    });
}

function addTopic() {
    var number = parseInt($('.topic:last').clone().text())
    console.log(number)
    if (isNaN(number)) {
        number = 0
    }
    number++
    var pushIn = $('.topic:last')
    $template = '<tr class="topic"><th scope="row">' + number + '</th><td><input type="text" class="form-control" id="bscTopic" aria-describedby="" placeholder="กรุณากรอกหัวข้อ"></td><td><button type="button" class="btn btn-danger removeTopic">ลบ</button></td></tr>'
    if (pushIn.length == 0) {
        pushIn = $('tbody').find('tr')
        pushIn.before($template)
        // pushIn.hide()
        // $template.fadeIn('400')
    } else {    	
        pushIn.after($template)
        // pushIn.hide()
        // $template.fadeIn('400')
    }
    removeTopic()
}