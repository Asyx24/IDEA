/**
 * Created by Clama2402 on 02/08/16.
 */

var allQuestions = new Array(
    'Wie viel Speichel wird pro Tag im Mund produziert?',
    'Welches Organ ist das Schwerste?',
    'Wie viel Luft atmet ein Mensch durchschnittlich pro Tag ein?',
    'Stellen Sie sich vor, man könnte ihn ausfalten: Wie groß ist die Oberfläche des Darms?',
    'Wie viele Knochen hat ein Mensch?',
    'Was ist der Fachausdruck für den daumenseitigen Unterarmknochen, die Speiche?',
    'Wenn der Arzt Ihren Thorax röntgen möchte, was meint er damit?',
    'Wie schnell wachsen Haare pro Tag?',
    'Wie oft blinzelt man ungefähr pro Minute?',
    'Welches ist der schwerste Knochen im menschlichen Körper?');

var allAnswers = new Array(
    'etwa 1.5 Liter','rund 4 Liter','0.3 - 0.5 Liter','über 10 Liter',
    'die Haut','die Lunge','die Leber','die Zunge',
    '4.000 Liter','12.000 Liter','5.000 Liter','1.300 Liter',
    'Er hat die Größe eines Badetuchs','Er ist in etwa so groß wie ein Tennisplatz','Ungefähr die Fläche einer Zweizimmerwohnung','Er hat die Größe eine Fußballfeldes',
    'rund 70','etwa 200','circa 12000','knapp 18500',
    'Ulna','Radius','Ossa temporalia','Wodka',
    'die Wirbelsäule','den Schädel','die Hüfte','den Brustkorb',
    '3 - 3.5 Zentimeter','1 - 1.5 Zentimeter','etwa 0.5 Zentimeter','bis zu 5 Zentimeter',
    '5 - 7 mal','10 - 15 mal','20 - 25 mal','30 - 35 mal',
    'Schulterblatt','Schädel','Oberschenkel','kleiner Zeh');

var allSolutions = new Array(
    'true','false','false','false',
    'true','false','false','false',
    'false','true','false','false',
    'false','true','false','false',
    'false','true','false','false',
    'false','true','false','false',
    'false','false','false','true',
    'false','false','true','false',
    'false','true','false','false',
    'false','false','true','false');

// Fragen Counter
var currentQuestion = 1;

// Score Counter
var score = 0;


// "Suche Gegner" Button
$(function(){
    $('#SearchOpponentButton').on('click', function (e) {
        window.location.href = "/connect";
    });
});


// "Nochmal spielen" Funktion
function replay(){
    window.location.href = "/connect";
}

// VARIABLE: Timerlaenge
sek = 10;

// Fragenanzahl
var qMax = 10;

// Timer Startzeit
sekStart = sek+1;

// Kosnstante: Groeße des Timerabfalls nach Timerlaenge
sekKonst = 100/sek;

// Konstante: Zeitpunkt des Farbwechsels
sek50 = sek/2;
sek20 = sek/5;

// Game Loop
function gameLoop() {
    $('#question').html(allQuestions[currentQuestion-1]);
    var answers = (currentQuestion-1)*4;
    for(var z = 1; z <= 4; z++){
        $('#a'+z).attr('value', allAnswers[answers]);
        if(allSolutions[answers] == 'true'){
            $('#a'+z).attr('name', 'true');
        }
        else{
            $('#a'+z).attr('name', 'false');
        }
        answers++;
    }
    timer();

}

// Timer
function timer() {
    var timerBar = $('#countdown');
    // wenn noch fragen vorhanden...
    if(currentQuestion <= qMax) {
        // zähle Timervariable runter
        sek--;
        // passe Balkenlaenge an
        timerBar.css('width', sek * sekKonst + '%');
        // wenn Timer nicht abgelaufen...
        if (sek >= 0) {
            // zähle weiter runter
            setTimeout('timer()', 1000);
            // färbe Timerbalken gelb unter 50%
            if(sek < sek50) timerBar.attr('class','progress-bar progress-bar-warning');
            // färbe Timerbalken rot unter 20%
            if(sek < sek20) timerBar.attr('class','progress-bar progress-bar-danger');
        }
        // wenn Timer abgelaufen...
        else {
            answerAnalysis();
            resetAnswers();
            // resette Timer
            timerBar.css('width', 100 + '%');
            sek = sekStart;
            $('#score').html(score);
            currentQuestion++;
            timerBar.attr('class','progress-bar progress-bar-success');
            setTimeout('reset()', 3500);
            if(currentQuestion <= qMax) {
                getScore();
                setTimeout('gameLoop()', 3500);

            }
            else{
                timer();
            }
        }
    }

    // wenn alle Fragen gespielt -> Ergebnis Screen
    else{
        setTimeout('showReultScreen()',3500)
    }
}

// Antwort 1 einloggen
$(function(){
    $('#a1').on('click', function (e) {
        $(this).css('backgroundColor','#ffa500');
        $(this).attr('chosen', 'true');
        for(var i = 2; i <= 4; i++){
            var answer = $('#a'+i);
            answer.css('backgroundColor','#5cb85c');
            answer.removeAttr('chosen');
        }
    });
});

// Antwort 2 einloggen
$(function(){
    $('#a2').on('click', function (e) {
        $('#a1').css('backgroundColor','#5cb85c');
        $('#a1').removeAttr('chosen');
        $(this).css('backgroundColor','#ffa500');
        $(this).attr('chosen', 'true');
        for(var i = 3; i <= 4; i++){
            var answer = $('#a'+ i);
            answer.css('backgroundColor','#5cb85c');
            answer.removeAttr('chosen');
        }
    });
});

// Antwort 3 einloggen
$(function(){
    $('#a3').on('click', function (e) {
        for(var i = 1; i <= 2; i++){
            $('#a'+i).css('backgroundColor','#5cb85c');
            $('#a'+i).removeAttr('chosen');
        }
        $(this).css('backgroundColor','#ffa500');
        $(this).attr('chosen', 'true');
        var a4 = $('#a4');
        a4.css('baclgroundColor','#5cb85c');
        a4.removeAttr('chosen');
    });
});

// Antwort 4 einloggen
$(function(){
    $('#a4').on('click', function (e) {
        for(var i = 1; i <= 3; i++) {
            $('#a'+i).css('backgroundColor','#5cb85c');
            $('#a'+i).removeAttr('chosen');
        }
        $(this).css('backgroundColor','#ffa500');
        $(this).attr('chosen', 'true');
    });
});

function showReultScreen() {
    $('#questionBox').css('paddingTop', '18vh');
    var text1 = $('#question');
    if ($('#score').html() > $('#opponentScore').html()) {
        text1.html('Sie haben gewonnen!');
    }
    else if ($('#score').html() == $('#opponentScore').html()) {
        text1.html('Unentschieden!');
    }
    else {
        text1.html('Sie haben verloren!');
    }
    text1.css('paddingBottom', '15vh');
    var text2 = $('#text2');
    text2.css('fontSize', '600%');
    text2.html(score + " - " + $('#opponentScore').html());
    $('#answer1').attr('class', 'hidden');
    $('#answer2').attr('class', 'hidden');
    var answer3 = $('#answer3');
    var a3 = $('#a3');
    answer3.css('border', 'dotted');
    answer3.css('borderWidth', '2px');
    answer3.css('borderColor', 'black');
    a3.css('backgroundColor', '');
    a3.attr('value', 'Nochmal spielen');
    a3.attr('class', 'btn btn-primary btn-lg btn-block answer');
    a3.attr('onclick', 'replay()');
    var answer4 = $('#answer4');
    var a4 = $('#a4');
    answer4.css('border', 'dotted');
    answer4.css('borderWidth', '2px');
    answer4.css('borderColor', 'black');
    a4.css('backgroundColor', '');
    a4.attr('value', 'Neuer Gegner');
    a4.attr('class', 'btn btn-primary btn-lg btn-block answer');
    a4.attr('onclick', 'replay()');
}

// Antworkblinker
function blinker() {
    $('.blink').fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
}

// Timer resetten
function reset() {
    for (var i = 1; i <= 4; i++) {
        $('#a'+i).css('backgroundColor','#5cb85c');
        $('#a'+i).attr('class','btn btn-success btn-lg btn-block answer');
    }
}

// resette Antowrtfelder

function resetAnswers() {
    for(var t = 1; t <= 4; t++) {
        var answer = $('#a'+t);
        answer.removeAttr('chosen');
    }
}

function answerAnalysis(){
    for(var b = 1; b <= 4; b++) {
        var answer = $('#a'+b);
        var blockCount = $('#block'+currentQuestion);
        // wenn korrekte Antwort eingeloggt...
        if (answer.attr('chosen') == 'true' && answer.attr('name') == 'true') {
            answer.attr('class', 'btn btn-success btn-lg btn-block answer blink');
            answer.css('backgroundColor','#5cb85c');
            blockCount.css('backgroundColor','#5cb85c');
            // richtige Antworkt blinkt auf und Punktzahl wird erhöht
            blinker();
            score++;
            break;
        }
        // wenn falsche Antwort eingeloggt...bzw. keine Antwort ausgewaehlt
        else {
            blockCount.css('backgroundColor','#D60032');
            // korrekte Antwort blinkt auf
            if (answer.attr('name') == 'true') {
                answer.attr('class', 'btn btn-success btn-lg btn-block answer blink');
                blinker();
                answer.attr('class', 'btn btn-success btn-lg btn-block answer');
            }
            // falsch ausgewählte Antwort leuchtet rot
            if (answer.attr('chosen') == 'true') {
                answer.css('backgroundColor','#d9534f');
                answer.attr('class', 'btn btn-danger btn-lg btn-block answer');
            }
        }
    }
}



