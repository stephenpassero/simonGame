$(document).ready(function() {
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

    function getUserResponse(numOfRounds, listeningMode) {
        let clicks = 0;
        let buttonsClicked = [];
        $('#button1').click(() => {
            if(clicks < numOfRounds && listeningMode === true){
                buttonsClicked.push(1);
                clicks++;
            }
        });

        $('#button2').click(() => {
            if(clicks < numOfRounds && listeningMode === true){
                buttonsClicked.push(2);
                clicks++;
            }
        });

        $('#button3').click(() => {
            if(clicks < numOfRounds && listeningMode === true){
                buttonsClicked.push(3);
                clicks++;
            }
        });

        $('#button4').click(() => {
            if(clicks < numOfRounds && listeningMode === true){
                buttonsClicked.push(4);
                clicks++;
            }
        });
        if(clicks === numOfRounds){
            listeningMode = false;
            return buttonsClicked;
        }
    }

    function arraysEqual(a, b) {
       for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function inStrictMode(){
        return $('#strict').hasClass('active');
    }

    function updateRound(round) {
        $('#count').html(round);
    }

    $('#start').click(() => {
        let listeningMode = false;
        while(true) {
            let numbers = [];
            for (let i = 0; i < 20; i++) {
                if(i === 19){
                    console.log('You won!');
                }
                updateRound(i + 1);
                addAnotherRandomNumber(numbers);
                playSequence(numbers);
                listeningMode = true;
                const userResponse = getUserResponse(i + 1, listeningMode);
                    if (!arraysEqual(numbers, userResponse)) {
                        if (inStrictMode()) {
                            break;
                        }
                    }
            }
        }
    });
});