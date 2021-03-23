/*
> Build an AJAX server request to Altcademy's dummy API to store High score
> Build an ARJAX function that will update score if user input correct
> **BONUS** Build a function that will add points to score based on the number of variables toggled as well as the magnitude of the number range

> Build a timer function that will countdown from 10, and every time ARJAX runs a sucessful solution, add 1s to this timer.
> Build a function that creates an equation based on parameters and supplies an answer for ARJAX to compare user input against.
[ARJAX]: 1) Updates current score based on user input (BONUS updates the score based on parameters toggled); 2) Adds 1s to timer based on user input; 3) Compares user input to devised equation
*/


$(document).ready(function() {

    var range = $('#myRange');
    $('#numberLimit').html(range.val())
    range.on('input', function() {
        $('#numberLimit').html(range.val())
    });
    
})