function submitForm() {
    var login = $('#login').val();
    var password = $('#password').val();
    var mode = $('#mode').val();

    console.log('Username:', login);
    console.log('Password:', password);
    console.log('Mode:', mode);

    var requestData = {
        login: login,
        password: password
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/user/authenticate',
        data: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        success: function (response) {
            console.log('Response:', response);
            SetToken(response.token, response.adminFlag);
            console.log("---------------------");
            console.log(GetToken());
            console.log(IsAdmin());
            window.location.href = 'cityes.html';
        },
        error: function (error) {
            console.error('ERROR:', error);
        }
    });

    $('#authForm')[0].reset();
}


// для админа: 
// {
//   "username": "kostya",
//   "password": "123"
// }

// для обычного юзера

// {
//   "username": "alexander",
//   "password": "123"
// }
