/*
> Build an AJAX server request to Altcademy's dummy API to store High score
> Build an ARJAX function that will update score if user input correct
> **BONUS** Build a function that will add points to score based on the number of variables toggled as well as the magnitude of the number range

> Build a timer function that will countdown from 10, and every time ARJAX runs a sucessful solution, add 1s to this timer.
> Build a function that creates an equation based on parameters and supplies an answer for ARJAX to compare user input against.
[ARJAX]: 1) Updates current score based on user input (BONUS updates the score based on parameters toggled); 2) Adds 1s to timer based on user input; 3) Compares user input to devised equation
*/
var randomizer = function(max) {
    return Math.floor(Math.random() * max);
}

    //-----------EQUATION FUNCTIONS -------------
var add = function(a,b) {
    $('#equation').html(a + ' + ' + b);
    return a+b
}
var subtract = function(a,b) {
    if((a-b) > 0) {
        $('#equation').html(a + ' - ' + b);
        return a-b;
    } else {
        $('#equation').html(b + ' - ' + a);
        return b-a;
    }
}
var multiply = function(a,b) {
    $('#equation').html(a + ' x ' + b);
    return a*b;
    }
var divide = function(a,b) {
    $('#equation').html(a + ' / ' + b);
    return a/b;
}

    //--------------------------------------------

var addToScore = function(symbols, range) {
    var currentScore = parseInt($('#currentScore').text())
    var parameterBonus = symbols.length;
    var rangeBonus = ((range/100)-(10/100))

    var scorePoint = (1+(1*rangeBonus))*parameterBonus
    $('#currentScore').html(currentScore+scorePoint);
}

var symbolBuilder = function() {
    var symbolArray = [];
    if($('#plus').prop("checked")) {
        symbolArray.push(add);
    }
    if($('#minus').prop("checked")) {
        symbolArray.push(subtract);
    }
    if($('#multiply').prop("checked")) {
        symbolArray.push(multiply);
    }
    if($('#divide').prop("checked")) {
        symbolArray.push(divide);
    }
    return symbolArray
}


var equationBuilder = function(range, symbols) {
    var num1 = randomizer(range) + 1;
    var num2 = randomizer(range) + 1;
    var symbol = symbols[randomizer(symbols.length)];
    
    if(symbol === divide) {
        if(num1%num2 == 0) {
            return symbol(num1, num2);
        } else if (num2%num1 == 0) {
            return symbol(num2, num1);
        } else {
            return equationBuilder(range, symbols)
        }
    } else {
        return symbol(num1, num2);
    }
}


var gamePlay = function() {
    var range = $('#myRange').val();
    var symbols = symbolBuilder()

    if(parseInt($('#timerNumber').text()) > 0) {
        var solution = equationBuilder(range, symbols);
        console.log('expected solution', solution);

        if($('#solution').text() === solution) {
            console.log('yo');
            var timer = parseInt($('#timerNumber').text());
            $('#timerNumber').html(timer+1);

            addToScore(symbols, range);

            $('#solution').val('');

            return gamePlay();
        }
    } else {
        console.log("game over, time's up!");
    }
}
$(document).ready(function() {
 
    var range = $('#myRange');
    $('#numberLimit').html(range.val())
    range.on('input', function() {
        $('#numberLimit').html(range.val())
    });

    $('#equation').on('click', function() {
        console.log('hi');
        gamePlay();
    })

    $('.answerForm').on('submit', function(e) {
        e.preventDefault();
        gamePlay();
    })

})