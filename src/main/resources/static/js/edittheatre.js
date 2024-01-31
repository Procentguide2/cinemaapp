var theatreData = null;
var cityesData = null;
var thData = { address: "", cityId: 0, theatreName: "" };
var testCounter = 0;


const endPoints = {
    theatre: {
        url: 'http://localhost:8080/theatres/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatreUpdate: {
        url: 'http://localhost:8080/theatres/update/',
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    cityes: {
        url: 'http://localhost:8080/cities/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
};


function GetUpdatesData() {
    testCounter += 1;
    thData.address = $('#address').val();
    thData.cityId = thData.cityId;
    thData.theatreName = $('#theatreName').val();
    return thData;
}

function GetCities() {
    LoadData(endPoints.cityes.url, endPoints.cityes.options)
        .then((data) => {
            console.log(data);
            cityesData = data;
            PrintTheater();
        }
        );
}

function UpdateTheater(theatreId) {
    endPoints.theatreUpdate.options.body = JSON.stringify(GetUpdatesData());
    endPoints.theatreUpdate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.theatreUpdate.url + theatreId, endPoints.theatreUpdate.options)
        .then((data) => {
            console.log(data);
            GetTheater(theatreId);
        }
        );
}

function GetTheater(theatreId) {
    LoadData(endPoints.theatre.url + theatreId, endPoints.theatre.options)
        .then((data) => {
            console.log(data);
            theatreData = data;
            thData.cityId = theatreData.cityId;
            GetCities();
        }
        );
}

function PrintTheater() {
    $('#cinemaName').text(theatreData.theatreName);
    $('#cinemaAddress').text(theatreData.address);
    const sessionsBody = $('#sessionsBody');
    sessionsBody.empty();
    let sityes = "";
    cityesData.forEach(element => {
        if (thData.cityId === element.id) {
            sityes += `<option value="${element.id}" selected="selected">${element.cityName}</option>`;    
        } else {
            sityes += `<option value="${element.id}">${element.cityName}</option>`;
        }
    });
    sityes = '<td><select id="cityes" autocomplete="off">' + sityes + '</select></td>';
    const row = '<tr>' +
        '<td>' + `<input type="text" id="theatreName" name="theatreName" value="${theatreData.theatreName}" required>` + '</td>' +
        sityes +
        '<td>' + `<input type="text" id="address" name="address" value="${theatreData.address}" required>` + '</td>' +
        '</tr>';
    sessionsBody.append(row);
    $('#cityes').change(function () {
        var selectedCity = $(this).val();
        thData.cityId = selectedCity;
    });
}


$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const theatreId = urlParams.get('theatreId');
    document.getElementById('UpdateTheatreData').addEventListener('click', function () {
        UpdateTheater(theatreId);
    });
    GetTheater(theatreId);
});