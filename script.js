/*
> Build an AJAX server request to Altcademy's dummy API to store High score
> Build an ARJAX function that will update score if user input correct
> **BONUS** Build a function that will add points to score based on the number of variables toggled as well as the magnitude of the number range

> Build a timer function that will countdown from 10, and every time ARJAX runs a sucessful solution, add 1s to this timer.
> Build a function that creates an equation based on parameters and supplies an answer for ARJAX to compare user input against.
[ARJAX]: 1) Updates current score based on user input (BONUS updates the score based on parameters toggled); 2) Adds 1s to timer based on user input; 3) Compares user input to devised equation
*/
var updateHighScore = function() {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/727?api_key=25',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: parseInt($('#currentScore').text())
            }
        }),
        success: function(response, textStatus) {
            loadHighScore();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    }); 
}

var loadHighScore = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/727?api_key=25',
        dataType: 'json',
        success: function(response, textStatus) {
            $('#highScore').text(response.task.content)
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}



var randomizer = function(max) {
    return Math.floor(Math.random() * max);
}

    //----------TIMER FUNCTIONS------------------
var timerDeduct = function() {
    var timer = parseInt($('#timerNumber').text());
    if(timer > 0) {
        timer -= 1
        $('#timerNumber').html(timer);
    }
}
var startTimer = function() {
    interval = window.setInterval(timerDeduct, 1000);
}
var stopTimer = function() {
    if(interval) {
        window.clearInterval(interval);
    }
}

    //------------------------------------------


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
    var parameterBonus = 0;
    symbols.forEach(function(symbol) {
        if(symbol === add) {
            parameterBonus++
        }
        if(symbol === subtract) {
            parameterBonus++
        }
        if(symbol === multiply) {
            parameterBonus += 2
        }
        if(symbol === divide) {
            parameterBonus += 2
        }
    })
    var rangeBonus = ((range/100)-(10/100))*5;

    var scorePoint = Math.floor((1+(1*rangeBonus))*parameterBonus)
    $('#currentScore').html(currentScore+scorePoint);
}

var clearScore = function() {
    var currentScore = parseInt($('#currentScore').text());
    var highScore = parseInt($('#highScore').text())

    if(currentScore > highScore) {
        updateHighScore();
    }
    $('#currentScore').text(0)
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


var gamePlay = function(symbols, range) {

            var timer = parseInt($('#timerNumber').text());
            $('#timerNumber').html(timer+1);
            addToScore(symbols, range);
            $('#solution').val('');


}

var playAgain = function() {
    
    loadHighScore();

    $('#equation').one('click', function() {
        range = $('#myRange').val();
        symbols = symbolBuilder()
        solution = equationBuilder(range, symbols);

        $('#solution').focus();
        startTimer();

    })

    $('.answerForm').on('submit', function(e) {
        e.preventDefault();

        if(parseInt($('#timerNumber').text()) > 0) {
            if(parseInt($('#solution').val()) === solution) {
                gamePlay(symbols, range);
                solution = equationBuilder(range, symbols);
            }
        } 
    })

    $('#timerNumber').on('DOMNodeInserted', function() {
        var timer = parseInt($('#timerNumber').text());
        if(timer == 0) {
            stopTimer();
            clearScore();
            $('#equation').html('Click Here to Play Again');
            $('#timerNumber').html(10);
            $('#solution').val('');

            return playAgain();
        }
    })        

}


$(document).ready(function() {
    var interval;
    var solution;
    var symbols;
    var range;

    $('#numberLimit').html($('#myRange').val())
    
    $('#myRange').on('input', function() {
        $('#numberLimit').html($('#myRange').val())
    });

    $('#equation').one('click', playAgain());

})