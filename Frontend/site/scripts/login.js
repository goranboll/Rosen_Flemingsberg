var api_url = 'http://localhost:8000/api'; 

$(document).ready(function(){

    $('#login').on('click', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        login(username, password);
    });

    $('#register').on('click', function(){
        var username = $('#registerusername').val();
        var email = $('#registreemail').val();
        var gangname = $('#gangname').val();
        register(username, email, gangname);
    });

});

function login(username, password){
     $.ajax({
      type: 'GET',
      url: api_url + '/register/'
    }).success(function(response) {
        alert("yay");
    });
}

function register(username, email, gangname){
    $.ajax({
      type: 'POST',
      url: api_url + '/register/',
      data: {username: username, email:email, gangname:gangname}
    }).success(function(response) {
        alert("yay");
    });
}