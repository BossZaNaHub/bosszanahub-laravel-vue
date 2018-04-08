$(document).ready(function() {
    $('.datetimepicker').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM',
    });
    $(document).on('change', '.exist', function(event) {
    	event.preventDefault();
    	var type = $(this).val();
    	console.log(type);
    	$('.select-type.show').removeClass('show').addClass('hide');
    	$('#'+type).removeClass('hide').addClass('show');
    	/* Act on the event */
    });
    $(document).on('click', 'button[type=submit]', function(event) {
        event.preventDefault();
        /* Act on the event */
        var form = $('form').serializeObject();
        console.log(form);
    });
});