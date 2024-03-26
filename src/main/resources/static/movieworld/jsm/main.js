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


this.ard = [];
this.asrdCount = 0;

function GetCityes() {
    LoadData(endPoints.cityes.url, endPoints.cityes.options)
        .then((data) => {
            $('.uk-placeholder').empty();
            let cityNames = "";
            data.forEach(element => {
                let line = `<li><a value="${element.id}" href="#">${element.cityName}</a></li>`;
                cityNames += line + `\n`;
            });

            $('.uk-placeholder').append(`<ul uk-tab>${cityNames}</ul>`);
            $('.uk-placeholder').append(`<ul class="uk-switcher uk-margin"></ul>`);

            GetTheaters(1, data.length);
        }
        );
}

function GetTheaters(idCity, end) {
    LoadData(endPoints.theatres.url + idCity, endPoints.theatres.options)
        .then((data) => {
            cinemasData = data;
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
    const editHeader = '<th class="uk-width-small">EDIT</th>';
    let tableHead = `
        <thead>
            <tr>
                <th class="uk-width-small">Cinema name</th>
                <th>Address</th>
                <th class="uk-width-small">Seans</th>
                ${IsAdmin() ? editHeader : ''}
            </tr>
        </thead>`;
        let tableBody = `<tbody>`;
    $.each(cinemasData, function (index, cinema) {
        const editButton = '<td><button class="uk-button uk-button-default" type="button">edit</button></td>';
        const tr = `<tr>
            <td>${cinema.theatreName}</td>
            <td>${cinema.address}</td>
            <td><button class="uk-button uk-button-default" type="button">sessions</button></td>
            ${IsAdmin() ? editButton : ''}
        </tr>`;

        tableBody += tr;
    });
    tableBody += '</tbody>';

    let row = `<table class="uk-table uk-table-justify uk-table-divider"> ${tableHead} ${tableBody} </table>`;
    return row;
}

$(document).ready(function () {
    GetCityes();
});