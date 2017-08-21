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
            running = false;
        }, 4000);
    }

    function onButtonPressed() {
        if (buttonsClicked[buttonsClicked.length - 1] !== numbers[buttonsClicked.length - 1]) {
            listeningMode = false;
            console.log('You lose');
            running = false;
        }
        if (buttonsClicked.length === numbers.length) {
            listeningMode = false;
            clearTimeout(inactivityTimer);
            start();
        } else {
            startInactivityTimer();
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
    let index = 0;
    function delayedLoop() {
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

        if(++index === numbers.length) {
            return;
        }
        window.setTimeout(delayedLoop, 1000);
    }


    function playSequence() {
        index = 0;
        delayedLoop();
    }

    function addAnotherRandomNumber(numbers) {
        numbers.push(Math.floor((Math.random() * 4) + 1));
    }

    function updateRound(round) {
        $('#count').html(round);
    }
    let numOfRounds = 0;
    let running = false;

    function start() {
        running = true;
        if (numOfRounds < 20) {
            numOfRounds++;
            updateRound(numOfRounds);
            addAnotherRandomNumber(numbers);
            playSequence();
            listeningMode = true;
            startInactivityTimer();
        }
    }
    $('#start').click(() => {
        if (!running) {
            start();
        }
    });
});