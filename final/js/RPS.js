var randomRPS = (players, cnt) => {
    var r = Math.floor(Math.random() * 50);
    var finalResult = $('#final-result');
    var result = '';
    var condict = { 'even': 'Even. AGAIN!', 'win': 'You win, you takes off my cloth! HoHoHo.', 'lose': 'You lose, oh no, I need to put on 1 cloth.' };
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

    var $cloth = $('#cloth-img');
    if (cnt > 4) {
        $cloth.attr('src', './image/' + '4' + '.jpg')
    } else {
        $cloth.attr('src', './image/' + cnt + '.jpg')
    }


    finalResult.html("<h2>" + result + "</h2>");

    var cloth = $('#cloth-remain');
    if (cnt > 4) {
        cloth.html("<h2>" + "I wear too much. It's so hot. " + (cnt - 1) + " pieces remaining</h2>");
    } else if (cnt == 3) {
        cloth.html("<h2>" + "I took off my beard~~ " + (cnt - 1) + " pieces remaining</h2>");
    } else if (cnt == 2) {
        cloth.html("<h2>" + "Look at my cute ears! " + (cnt - 1) + " piece remaining</h2>");
    } else if (cnt == 1) {
        cloth.html("<h2>" + "Oh no! I'm nude now <3</h2>");
    }


    cloth.data('value', String(cnt));
    cloth.attr('data-value', String(cnt));
}

var playAgain = () => {
    console.log("play again!!");
    $('#play').removeAttr('disabled', 'disabled').html("<h3>I'm ready to capture my gesture</h3>");
    $('#again-div').empty();
    setTimeout(() => { location.href = '#playing-section'; }, 500);
}





// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function becomeSticky() {

    // Get the header
    var header = document.getElementById("fixed-cam");
    var main = document.getElementById("MAIN");
    var preCon = document.getElementById("pred-console");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        main.classList.add("main");
        preCon.classList.add("pred-con-color");
    } else {
        header.classList.remove("sticky");
        main.classList.remove("main");
        preCon.classList.remove("pred-con-color");
    }
}