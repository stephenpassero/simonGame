$(document).ready(function() {
    $('#strict').click(() => {
        if ($('#strict').hasClass('active')) {
            $('#strict').removeClass('active');
        } else {
            $('#strict').addClass('active');
        }
    });
    $('#start').click(() => {
        for (let i = 0; i < 20; i++) {
            let numbers = [];
            numbers.push(Math.floor((Math.random() * 4) + 1));
            for (let e = 0; e < numbers.length; e++) {
                $('#count').html(i + 1);
                 if (numbers[e] === 1) {
                    $('#button' + numbers[e]).css('background-color', '#13ff7c');
                } else if (numbers[e] === 2) {
                    $('#button' + numbers[i]).css('background-color', '#ff4c4c');
                } else if (numbers[e] === 3) {
                    $('#button' + numbers[i]).css('background-color', '#fed93f');
                } else if (numbers[e] === 4) {
                    $('#button' + numbers[i]).css('background-color', '#1c8cff');
                }
            }
        }
    });
});