$(document).ready(function() {

    var range = $('#myRange');
    $('#numberLimit').html(range.val())
    range.on('input', function() {
        $('#numberLimit').html(range.val())
    });
    
})