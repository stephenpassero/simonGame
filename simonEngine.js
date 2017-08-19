$(document).ready(function() {
    let inactivityTimer;
    let listeningMode = false;
    let numbers = [];
    let buttonsClicked = [];

    function startInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }

        inactivityTimer = setTimeout(() => {
            listeningMode = false;
            console.log('You lose');
        }, 4000);
    }

    function onButtonPressed() {
        if(!buttonsClicked[buttonsClicked.length - 1] === numbers[buttonsClicked.length - 1]){
            console.log('You lose');
            listeningMode = false;
        }
        if (buttonsClicked.length === numbers.length) {
            listeningMode = false;
            startInactivityTimer();
            start();
        }
    }

    $('#button1').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(1);
            onButtonPressed();
        }
    });
    $('#button2').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(2);
            onButtonPressed();
        }
    });
    $('#button3').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(3);
            onButtonPressed();
        }
    });
    $('#button4').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(4);
            onButtonPressed();
        }
    });
    $('#strict').click(() => {
        if ($('#strict').hasClass('active')) {
            $('#strict').removeClass('active');
        } else {
            $('#strict').addClass('active');
        }
    });

    function playSequence(numbers) {
        for (let index = 0; index < numbers.length; index++) {
            const nextNumber = numbers[index];
            if (nextNumber === 1) {
                $('#button' + nextNumber).css('background-color', '#13ff7c');
                setTimeout(() => {
                    $('#button' + nextNumber).css('background-color', '#090');
                }, 400);
            } else if (nextNumber === 2) {
                $('#button' + nextNumber).css('background-color', '#ff4c4c');
                setTimeout(() => {
                    $('#button' + nextNumber).css('background-color', '#bc2000');
                }, 400);
            } else if (nextNumber === 3) {
                $('#button' + nextNumber).css('background-color', '#fed93f');
                setTimeout(() => {
                    $('#button' + nextNumber).css('background-color', '#bcbc20');
                }, 400);
            } else if (nextNumber === 4) {
                $('#button' + nextNumber).css('background-color', '#1c8cff');
                setTimeout(() => {
                    $('#button' + nextNumber).css('background-color', '#0002bc');
                }, 400);
            }
        }
    }

    function addAnotherRandomNumber(numbers) {
        numbers.push(Math.floor((Math.random() * 4) + 1));
    }

    function getUserResponse() {
        if (listeningMode) {
            setTimeout(getUserResponse, 0);
            return [0, 1];
        } else {
            return buttonsClicked;
        }
    }

    function arraysEqual(a, b) {
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function updateRound(round) {
        $('#count').html(round);
    }
    let numOfRounds = 0;
    function start(){
        if(numOfRounds < 20){
            numOfRounds++;
            updateRound(numOfRounds);
            addAnotherRandomNumber(numbers);
            playSequence(numbers);
            listeningMode = true;
            startInactivityTimer();
        }
    }

    $('#start').click(() => {
        start();
    });
});