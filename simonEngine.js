$(document).ready(function() {
    let inactivityTimer;
    let listeningMode = false;
    let numbers = [];
    let buttonsClicked = [];
    const buttonOneSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    const buttonTwoSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    const buttonThreeSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    const buttonFourSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    function startInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        inactivityTimer = setTimeout(() => {
            gotItWrong();
        }, 4000);
    }

    function inStrictMode() {
        return $('#strict').hasClass('active');
    }

    function buttonOneFlash() {
        $('#button1').css('background-color', '#13ff7c');
        buttonOneSound.play();
        setTimeout(() => {
            $('#button1').css('background-color', '#090');
        }, 400);
    }

    function buttonTwoFlash() {
        $('#button2').css('background-color', '#ff4c4c');
        buttonTwoSound.play();
        setTimeout(() => {
            $('#button2').css('background-color', '#bc2000');
        }, 400);
    }

    function buttonThreeFlash() {
        $('#button3').css('background-color', '#fed93f');
        buttonThreeSound.play();
        setTimeout(() => {
            $('#button3').css('background-color', '#bcbc20');
        }, 400);
    }

    function buttonFourFlash() {
        $('#button4').css('background-color', '#1c8cff');
        buttonFourSound.play();
        setTimeout(() => {
            $('#button4').css('background-color', '#0002bc');
        }, 400);
    }

    function gotItWrong() {
        listeningMode = false;
        clearTimeout(inactivityTimer);
        $('#count').html('! !');
        if (inStrictMode()) {
            numbers = [];
            buttonsClicked = [];
            numOfRounds = 0;
            return;
        }
        reDo = true;
        setTimeout(() => {
            start();
        }, 1000);
    }

    function onButtonPressed() {
        if (buttonsClicked[buttonsClicked.length - 1] !== numbers[buttonsClicked.length - 1]) {
            gotItWrong();
            return;
        }
        if (buttonsClicked.length === numbers.length) {
            listeningMode = false;
            clearTimeout(inactivityTimer);
            reDo = false;
            start();
        } else {
            startInactivityTimer();
        }
    }
    $('#button1').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(1);
            onButtonPressed();
            buttonOneFlash();
        }
    });
    $('#button2').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(2);
            onButtonPressed();
            buttonTwoFlash();
        }
    });
    $('#button3').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(3);
            onButtonPressed();
            buttonThreeFlash()
        }
    });
    $('#button4').click(() => {
        if (listeningMode === true) {
            buttonsClicked.push(4);
            onButtonPressed();
            buttonFourFlash();
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
    let buttonFlashTimer;
    function delayedLoop(callback) {
        const nextNumber = numbers[index];
        if (nextNumber === 1) {
            buttonOneFlash();
        } else if (nextNumber === 2) {
            buttonTwoFlash();
        } else if (nextNumber === 3) {
            buttonThreeFlash();
        } else if (nextNumber === 4) {
            buttonFourFlash();
        }
        if (++index === numbers.length) {
            callback();
            return;
        }
        buttonFlashTimer = setTimeout(delayedLoop.bind(this, callback), 1000);
    }

    function playSequence(callback) {
        index = 0;
        delayedLoop(callback);
    }

    function addAnotherRandomNumber(numbers) {
        numbers.push(Math.floor((Math.random() * 4) + 1));
    }

    function updateRound(round) {
        $('#count').html(round);
    }
    let numOfRounds = 0;
    let firstRun = true;
    let reDo = false;

    function start() {
        buttonsClicked = [];
        if (numOfRounds < 20) {
            if (!reDo) {
                numOfRounds++;
                addAnotherRandomNumber(numbers);
            }
            updateRound(numOfRounds);
            if (firstRun) {
                playSequence(() => {
                    listeningMode = true;
                    startInactivityTimer();
                });
            } else {
                setTimeout(() => {
                    playSequence(() => {
                        listeningMode = true;
                        startInactivityTimer();
                    });
                }, 1500);
            }
            firstRun = false;
        }else{
            setTimeout(() => {
                buttonOneFlash();
                buttonTwoFlash();
                buttonThreeFlash();
                buttonFourFlash();
                setTimeout(() => {
                    buttonOneFlash();
                    buttonTwoFlash();
                    buttonThreeFlash();
                    buttonFourFlash();
                    numOfRounds = 0;
                    firstRun = true;
                    reDo = false;
                }, 1350);
            }, 1000);
        }
    }
    $('#start').click(() => {
        numbers = [];
        buttonsClicked = [];
        numOfRounds = 0;
        firstRun = true;
        reDo = false;
        listeningMode = false
        clearTimeout(inactivityTimer);
        clearTimeout(buttonFlashTimer);
        start();
    });
});