// var searchList = new List('users', {
//     valueNames: ['id-staff', 'name', 'dept']
// });

$(document).ready(function() {
    $('#datetimepicker1').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM',
    }).on('dp.change', function(e) {
        var date = $('#getDate2').val();
        // window.location.href = '/result?date=' + date;

    });
    $(document).on('click', '.summary', function(event) {
        event.preventDefault();
        var id = $(this).data('id');
        var date = $(this).data('date');
        $.ajax({
                url: 'api/personal.php',
                type: 'POST',
                data: { id: id, date: date },
            })
            .done(function(response) {
                // console.log(response);
                $('#view').find('.name').text(response.name);
                $('#view').find('.modal-body tr td').remove();
                $.each(response.data, function(index, val) {
                	$('#view').find('.modal-body tr:last').after('<tr>');
                	console.log(index,val);
                	$.each(val,function(index,val){
                		$('#view').find('.modal-body tr:last').append('<td>'+val+'</td>')
                	// 	console.log(val);
                	});
                });
                $.each(response.image, function(index, val) {
                	 /* iterate through array or object */
                	 console.log(val);
                	 $('#view').find('table').after('<a target="_blank" href="/stock_images/'+val.img+'">'+val.img+'</a>');
                });
                // $('#view').find('.modal-body table').append('</tr>');
            })
            .fail(function() {
                console.log("error");
            })
    });
});