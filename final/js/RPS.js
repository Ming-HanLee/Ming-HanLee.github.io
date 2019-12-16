var randomRPS = (players, cnt) => {
    var r = Math.floor(Math.random() * 50);
    var finalResult = $('#final-result');
    var result = '';
    var condict = { 'even': 'Even. AGAIN', 'win': 'You win, RimaoSensei takes off 1 piece of cloth.', 'lose': 'You lose, RimaoSensei puts on 1 piece of cloth.' };
    var senseidict = { 0: "RimaoSensei picks Rock", 1: "RimaoSensei picks Paper", 2: "RimaoSensei picks Scissors" };
    if (r % 3 == 0) {
        $('#senseino-img').attr('src', './image/rock.jpg');
        $('#senseino-pick').text("Rock");
    } else if (r % 3 == 1) {
        $('#senseino-img').attr('src', './image/paper.jpg');
        $('#senseino-pick').text("Paper");
    } else if (r % 3 == 2) {
        $('#senseino-img').attr('src', './image/scissors.jpg');
        $('#senseino-pick').text("Scissors");
    }

    if (players == "Rock" && r % 3 == 0) {
        result = condict['even'];
    } else if (players == "Paper" && r % 3 == 1) {
        result = condict['even'];
    } else if (players == "Scissors" && r % 3 == 2) {
        result = condict['even'];
    } else if (players == "Rock" && (r % 3 == 2)) {
        result = condict['win'];
        cnt -= 1;
    } else if (players == "Rock" && (r % 3 == 1)) {
        result = condict['lose'];
        cnt += 1;
    } else if (players == "Paper" && r % 3 == 0) {
        result = condict['win'];
        cnt -= 1;
    } else if (players == "Paper" && r % 3 == 2) {
        result = condict['lose'];
        cnt += 1;
    } else if (players == "Scissors" && r % 3 == 1) {
        result = condict['win'];
        cnt -= 1;
    } else if (players == "Scissors" && r % 3 == 0) {
        result = condict['lose'];
        cnt += 1;
    }


    finalResult.html("<h2>" + result + "</h2>");

    var cloth = $('#cloth-remain');
    cloth.html("<h2>" + cnt + " clothes remain to have Sensei wear nothing</h2>");
    cloth.data('value', String(cnt));
    cloth.attr('data-value', String(cnt));
}

var playAgain = () => {
    console.log("play again!!");
    $('#play').removeAttr('disabled', 'disabled').html("<h3>I'm ready to capture my gesture</h3>");
    $('#again-div').empty();
    setTimeout(() => { location.href = '#playing-section'; }, 500);
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() { myFunction() };

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}