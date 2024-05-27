var theatreData = null;
var cityesData = null;
var thData = { address: "", cityId: 0, theatreName: "" };
var testCounter = 0;


const endPoints = {
    theatre: {
        url: `${getHost()}theatres/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatreUpdate: {
        url: `${getHost()}theatres/update/`,
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
        url: `${getHost()}cities/`,
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

function UpdateTheater(cinemaId) {
    endPoints.theatreUpdate.options.body = JSON.stringify(GetUpdatesData());
    endPoints.theatreUpdate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.theatreUpdate.url + cinemaId, endPoints.theatreUpdate.options)
        .then((data) => {
            console.log(data);
            GetTheater(cinemaId);
        }
        );
}

function GetTheater(cinemaId) {
    LoadData(endPoints.theatre.url + cinemaId, endPoints.theatre.options)
        .then((data) => {
            console.log(data);
            theatreData = data;
            thData.cityId = theatreData.cityId;
            GetCities();
        }
        );
}

function PrintTheater() {
    console.log(theatreData);
    Object.keys(theatreData).forEach(key => {
        console.log(`${key}: ${theatreData[key]}`);
    });

    $('#cinemaName').text(theatreData.theatreName);
    $('#cinemaAddress').text(theatreData.address);
    const sessionsBody = $('.uk-placeholder');
    sessionsBody.empty();
    let sityes = "";
    cityesData.forEach(element => {
        if (thData.cityId === element.id) {
            sityes += `<option value="${element.id}" selected="selected">${element.cityName}</option>`;    
        } else {
            sityes += `<option value="${element.id}">${element.cityName}</option>`;
        }
    });
    sityes = '<td> <span class="uk-margin-small-right" uk-icon="location"></span><select style="width:175px" id="cityes" autocomplete="off">' + sityes + '</select></td>';
    const row = '<tr>' + 
                    '<td>' + 
                        '<span class="uk-margin-small-right" uk-icon="quote-right"></span>' +
                        `<input type="text" id="theatreName" name="theatreName" value="${theatreData.theatreName}" required>` + 
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    sityes +
                    '<td>' +
                        `<input type="text" id="address" name="address" value="${theatreData.address}" required>` +
                    '</td>' +
                '</tr>';
    sessionsBody.append(row);
    
    $('#cityes').change(function () {
        var selectedCity = $(this).val();
        thData.cityId = selectedCity;
        console.log(selectedCity);
    });
}

function init() {
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get('cinemaId');
    if (cinemaId && IsAdmin()) {
        document.getElementById('UpdateTheatreData').addEventListener('click', function () {
            UpdateTheater(cinemaId);
        });
        GetTheater(cinemaId);
    } else {
        $('.uk-placeholder').hide();
        $('#UpdateTheatreData').hide();
    }
    
    IsAdmin() ? $("#admin").show() : $("#admin").hide();
});