const endPoints = {
    cities: {
        url: 'http://192.168.0.179:8080/cities',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatres: {
        url: 'http://192.168.0.179:8080/theatres/city/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    reset: function () {
        this.private.options.headers.Authorization = `Bearer ${GetToken()}`;
        this.login.options.body = JSON.stringify(GetUserNameAndPassword());
    }
};

function GetToken() {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

    return token;
}

function IsAdmin() {
    const isAdmin = document.cookie
    .split("; ")
    .find((row) => row.startsWith("isAdmin="))
    ?.split("=")[1];

    return isAdmin;
}

function GetUserNameAndPassword() {
    let username = "";
    let password = "";
    if (document.querySelector('#username') && document.querySelector('#password')) {
        username = document.querySelector('#username').value;
        password = document.querySelector('#password').value;
    }

    return {
        username: username,
        password: password
    }
}

const LoadData = async (_url, optons = {}) => {
    const response = await fetch(_url, optons);
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        data = await response.text();
    }
    return data
};

function GetCities() {
    // endPoints.reset();
    LoadData(endPoints.cities.url, endPoints.cities.options)
        .then((data) => {
            console.log(data);
            $('#cities').empty();
            $('#cities').append('<option value="">-- select city --</option>');
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.cityName}</option>`
                $('#cities').append(line);
            });
            $('#cities').show();
        }
        );
}

function GetTheaters(idCiti) {
    LoadData(endPoints.theatres.url + idCiti, endPoints.theatres.options)
        .then((data) => {
            console.log(data);
            cinemasData = data;
        }
        );
}



// mokap
const cinemasData = {
    "1": [
        { cinemaId: 1, name: "Benefit", address: "Lunaparkovaya st. 45, Odessa" },
        { cinemaId: 2, name: "Herkules", address: "Narniya st. 5, Odessa" }
    ],
    "2": [
        { cinemaId: 3, name: "Cinema A", address: "Adress A, Kiev" },
        { cinemaId: 4, name: "Cinema B", address: "Adress B, Kiev" }
    ],
    "3": [
        { cinemaId: 5, name: "Cinema X", address: "Adress X, Lutsk" },
        { cinemaId: 6, name: "Cinema Y", address: "Adress Y, Lutsk" }
    ]
};


function init() {
    // document.getElementById('GetCities').addEventListener('click', function () {
    //     GetCities();
    // });
}

$(document).ready(function () {
    $('#cities').hide();
    GetCities();
    $('#cities').change(function () {
        var selectedCity = $(this).val();
        GetTheaters(selectedCity);
        var cinemas = cinemasData[selectedCity];

        if (selectedCity !== "" && cinemas) {
            $('#cinemaBody').empty();

            $.each(cinemas, function (index, cinema) {
                var row = '<tr>' +
                    '<td>' + cinema.name + '</td>' +
                    '<td>' + cinema.address + '</td>' +
                    '<td><button class="sessionButton" data-cinema="' + cinema.cinemaId + '">Seanses</button></td>' +
                    '</tr>';
                $('#cinemaBody').append(row);
            });

            $('#cinemaTable').show();

            $('.sessionButton').click(function () {
                var cinemaName = $(this).data('cinema');

                window.open('sessions.html?cinemaId=' + encodeURIComponent(cinemaName), '_self');
            });
        } else {
            $('#cinemaTable').hide();
        }
    });
});