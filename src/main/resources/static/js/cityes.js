var cinemasData = null;

const endPoints = {
    cityes: {
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
    }
};

function GetCityes() {
    LoadData(endPoints.cityes.url, endPoints.cityes.options)
        .then((data) => {
            console.log(data);
            $('#cityes').empty();
            $('#cityes').append('<option value="">-- select city --</option>');
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.cityName}</option>`
                $('#cityes').append(line);
            });
            $('#cityes').show();
        }
        );
}

function GetTheaters(idCity) {
    LoadData(endPoints.theatres.url + idCity, endPoints.theatres.options)
        .then((data) => {
            console.log(data);
            cinemasData = data;
            PrintTheaters();
        }
        );
}


function init() {
}


function PrintTheaters() {
    console.log(cinemasData);
    if (cinemasData) {
        $('#headers').empty();
        let baseHeaders = "<th>Cinema name</th><th>Address</th><th>Seans</th>";
        $('#headers').append((IsAdmin() ? baseHeaders + '<th>Edit</th>' : baseHeaders));

        $('#cinemaBody').empty();
        $.each(cinemasData, function (index, cinema) {

            var row = '<tr>' +
                '<td>' + cinema.theatreName + '</td>' +
                '<td>' + cinema.address + '</td>' +
                '<td><button class="sessionButton" data-cinema="' + cinema.id + '">Seanses</button></td>' +
                (IsAdmin() ? '<td><button class="editButton" data-cinema="' + cinema.id + '">EDIT</button></td>' : "") +
                '</tr>';
            $('#cinemaBody').append(row);
        });

        $('#cityName').text(`${cinemasData[0].cityName} cinemas:`);

        $('#cinemaTable').show();

        $('.sessionButton').click(function () {
            var cinemaName = $(this).data('cinema');
            window.open('sessions.html?cinemaId=' + encodeURIComponent(cinemaName), '_self');
        });
        $('.editButton').click(function () {
            var cinemaName = $(this).data('cinema');
            window.open('edittheatre.html?theatreId=' + encodeURIComponent(cinemaName), '_self');
        });
    } else {
        $('#cinemaTable').hide();
    }
}

$(document).ready(function () {
    $('#cityes').hide();
    GetCityes();
    $('#cityes').change(function () {
        var selectedCity = $(this).val();
        GetTheaters(selectedCity);
    });
});