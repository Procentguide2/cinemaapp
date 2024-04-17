selectedCityID = -1;
selectedTheatreID = -1;
operationType = "";
theatersData = null;

const endPoints = {
    cityes: {
        url: `${getHost()}cities`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatres: {
        url: `${getHost()}theatres`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    theatresCreate: {
        url: `${getHost()}theatres/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    theatresDelete: {
        url: `${getHost()}theatres/`,
        options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};

function GetCityes() {
    LoadData(endPoints.cityes.url, endPoints.cityes.options)
        .then((data) => {
            $('#selectCity').empty();
            $('#cityName').val('');
            let cityNames = '<option value="-1">Select City</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.cityName}</option>`;
                cityNames += line;
            });

            $('#selectCity').append(`${cityNames}`);
        }
        );
}

function GetTheatres() {
    LoadData(endPoints.theatres.url, endPoints.theatres.options)
        .then((data) => {
            theatersData = data;
            $('#selectTheatre').empty();
            $('#address').empty();
            $('#theatreName').val('');
            let theatreNames = '<option value="-1">Select Theatre</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.theatreName}</option>`;
                theatreNames += line;
            });

            $('#selectTheatre').append(`${theatreNames}`);
        }
        );
}

function AddTheater() {
    const body = {
        theatreName: $('#theatreName').val(),
        address: $('#address').val(),
        cityId: Number($('#selectCity').val()),
    }
    console.log(body);
    endPoints.theatresCreate.options.body = JSON.stringify(body);
    endPoints.theatresCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    console.log(endPoints.theatresCreate.options.body);
    console.log(endPoints.theatresCreate.options.headers);
    LoadData(endPoints.theatresCreate.url, endPoints.theatresCreate.options)
        .then((data) => {
            console.log(data);
            // location.reload();
        }
        );
}

function DeleteTheater() {
    if (selectedTheatreID < 0) {
        return;
    }
    endPoints.theatresDelete.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.theatresDelete.url + selectedTheatreID, endPoints.theatresDelete.options)
        .then((data) => {
            console.log(data);
            GetCityes();
            GetTheatres();
        }
        );

}

function EditTheater() {
    if (selectedTheatreID < 0) {
        return;
    }
    const body = {
        theatreName: $('#theatreName').val(),
        address: $('#address').val(),
        cityId: Number($('#selectCity').val()),
    }
    endPoints.theatresCreate.options.body = JSON.stringify(body);
    endPoints.theatresCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.theatresCreate.url, endPoints.theatresCreate.options)
        .then((data) => {
            console.log(data);
            GetCityes();
            GetTheatres();
        }
        );
}


function main() {
    GetCityes();
    GetTheatres();

    const form = $('#cityForm');
    const actionSelect = $('#action');
    const selectCity = $('#selectCity');
    const selectTheatre = $('#selectTheatre');
    const cityDataDiv = $('#cityDataDiv');
    const selectTheaterDiv = $('#selectTheaterDiv');
    const submitBtnDiv = $('#submitBtnDiv');

    actionSelect.on('change', function() {

        $('#selectCity').val(-1);
        $('#selectTheatre').val(-1);
        $('#theatreName').val('');
        $('#address').val('');

        if (actionSelect.val() === 'none') {
            cityDataDiv.hide();
        } else if (actionSelect.val() === 'delete') {
            selectTheaterDiv.show();
            cityDataDiv.hide();
        } else if (actionSelect.val() === 'edit') {
            selectTheaterDiv.show();
            cityDataDiv.show();
        } else {
            selectTheaterDiv.hide();
            cityDataDiv.show();
        }

        if (actionSelect.val() !== '') {
            submitBtnDiv.show();
        } else {
            submitBtnDiv.hide();
        }

        operationType = actionSelect.val();
        console.log(operationType);

    });

    selectCity.on('change', function() {
        var selectedText = selectCity.find('option:selected').text();
        $('#cityName').val(selectedText);
        selectedCityID = Number(selectCity.val());
        console.log(selectedCityID);
    });

    selectTheatre.on('change', function() {
        var selectedText = selectTheatre.find('option:selected').text();
        $('#theatreName').val(selectedText);
        selectedTheatreID = Number(selectTheatre.val());
        theatersData.forEach(element => {
            if (Number(element.id) === selectedTheatreID) {
                $('#address').val(element.address);
                $('#selectCity').val(element.cityId);
            }
        })
        console.log(selectedTheatreID);
    });


    $('#submitButton').click(function() {
        console.log(operationType);
        if (operationType === 'add') {
            AddTheater();
        } else if (operationType === 'edit') {
            EditTheater();
        } else if (operationType === 'delete') {
            DeleteTheater();
        }
    });
}

$(document).ready(function() {
    if (IsAdmin()) {
        main();
    } else {
        $('.uk-container.uk-container-xsmall').hide();
    }
});
