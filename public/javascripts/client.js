/**
 * Created by Clama2402 on 11/08/16.
 */
var name;
var socket;
var myStatus = false;
var opponentStatus = false;

$(document).ready(function(){
    // WebSocket
    socket = io.connect();
    // neue Nachricht
    socket.on('chat', function (data) {
        $('#content').append(
            $('<li></li>').append(
                // Name
                $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
                // Nachricht
                $('<span>').text(data.text))
        );
        // nach unten scrollen wenn Chat History voll
        $('#chatHistory').scrollTop($('#chatHistory')[0].scrollHeight);
    });

    socket.on('score', function(data){
        $('#opponentScore').html(data.score);
    });

    socket.on('ready', function (data) {
        opponentStatus = data.status;
        if(opponentStatus == true && myStatus == true){
            window.location.href = "/match";
        }
    });

    // Nachricht senden
    function senden(){
        // Eingabefelder auslesen
        var text = $('#messageInput').val();
        // Socket sendet
        socket.emit('chat', { name: name, text: text });
        // Text-Eingabe leeren
        $('#messageInput').val('');
    }
    // bei einem Klick (Nachricht senden)
    $('#sendMessageButton').click(senden);
    // oder mit der Enter-Taste (Nachricht senden)
    $('#messageInput').keypress(function (e) {
        if (e.which == 13) {
            senden();
        }
    });
});

function getScore(){
    var score = $('#score').html();
    socket.emit('score', { score: score});
}

$(function(){
    $('#SearchOpponentButton').on('click', function (e) {
        name = $('#username').val();
    });
});

$(function(){
    $('#readyButton').on('click', function (e) {
        myStatus = true;
        socket.emit('ready',{ status: true});
        if(opponentStatus == true && myStatus == true){
            window.location.href = "/match";
        }
    });
});





