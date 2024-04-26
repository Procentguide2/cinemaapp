var cinemasData = null;
var cityesData = null;

const endPoints = {
    cityes: {
        url: `${getHost()}cities`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatres: {
        url: `${getHost()}theatres/city/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};


this.ard = [];
this.asrdCount = 0;

function GetCityes() {
    LoadData(endPoints.cityes.url, endPoints.cityes.options)
        .then((data) => {
            cityesData = data;
            console.log(cityesData);

            $('.uk-placeholder').empty();
            let cityNames = "";
            data.forEach(element => {
                let line = `<li><a value="${element.id}" href="#">${element.cityName}</a></li>`;
                cityNames += line + `\n`;
            });

            $('.uk-placeholder').append(`<ul uk-tab>${cityNames}</ul>`);
            $('.uk-placeholder').append(`<ul class="uk-switcher uk-margin"></ul>`);

            GetTheaters(0, data.length);
        }
        );
}

function GetTheaters(idCity, end) {
    let id = cityesData[idCity].id;
    LoadData(endPoints.theatres.url + id, endPoints.theatres.options)
        .then((data) => {
            cinemasData = data;
            console.log(endPoints.theatres.url + id);
            this.ard.push(PrintTheaters());
            this.asrdCount += 1;
            if (this.asrdCount >= end) {
                let lines = ""
                for (let index = 0; index < end; index++) {
                    lines += `<li>${this.ard[index]}</li>`;
                }
                $('.uk-switcher.uk-margin').append(`${lines}`);
            } else {
                GetTheaters(idCity + 1, end);
            }

        }
        );
}


function init() {
}


function PrintTheaters() {
    const editHeader = '<th class="uk-width-small"></th>';
    let tableHead = `
        <thead>
            <tr>
                <th class="uk-width-small">Назва театру</th>
                <th>Адреса</th>
                <th class="uk-width-small"></th>
                ${IsAdmin() ? editHeader : ''}
            </tr>
        </thead>`;
        let tableBody = `<tbody>`;
    $.each(cinemasData, function (index, cinema) {
        const editButton = `<td><a class="uk-button uk-button-default uk-button-small" href="edittheatre.html?cinemaId=${cinema.id}">редагувати</a></td>`;
        const tr = `<tr>
            <td>${cinema.theatreName}</td>
            <td>${cinema.address}</td>
            <td><a class="uk-button uk-button-default uk-button-small" href="sessions.html?cinemaId=${cinema.id}">до сеансу</a></td>
            ${IsAdmin() ? editButton : ''}
        </tr>`;

        tableBody += tr;
    });
    tableBody += '</tbody>';

    let row = `<table class="uk-table uk-table-striped uk-table-hover uk-table-middle"> ${tableHead} ${tableBody} </table>`;
    return row;
}

$(document).ready(function () {
    GetCityes();
    IsAdmin() ? $("#admin").show() : $("#admin").hide();
});