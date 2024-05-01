selectedID = -1;
operationType = "";

const endPoints = {
    cityes: {
        url: `${getHost()}cities`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    cityesCreate: {
        url: `${getHost()}cities/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    citiesDelete: {
        url: `${getHost()}cities/`,
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

function AddCity() {
    const body = {
        cityName: $('#cityName').val()
    }
    endPoints.cityesCreate.options.body = JSON.stringify(body);
    endPoints.cityesCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.cityesCreate.url, endPoints.cityesCreate.options)
        .then((data) => {
            console.log(data);
            location.reload();
        }
        );
}

function DeleteCity() {
    if (selectedID < 0) {
        return;
    }
    endPoints.citiesDelete.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.citiesDelete.url + selectedID, endPoints.citiesDelete.options)
        .then((data) => {
            console.log(data);
            GetCityes();
        }
        );

}

function EditCity() {
    if (selectedID < 0) {
        return;
    }
    const body = {
        id: selectedID,
        cityName: $('#cityName').val()
    }
    endPoints.cityesCreate.options.body = JSON.stringify(body);
    endPoints.cityesCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.cityesCreate.url, endPoints.cityesCreate.options)
        .then((data) => {
            console.log(data);
            GetCityes();
        }
        );
}


function main() {
    GetCityes();

    const form = $('#cityForm');
    const actionSelect = $('#action');
    const selectCity = $('#selectCity');
    const selectCityDiv = $('#selectCityDiv');
    const cityNameDiv = $('#cityNameDiv');
    const submitBtnDiv = $('#submitBtnDiv');

    actionSelect.on('change', function() {
        if (actionSelect.val() === 'none') {
            cityNameDiv.hide();
        } else if (actionSelect.val() === 'delete') {
            selectCityDiv.show();
            cityNameDiv.hide();
        } else if (actionSelect.val() === 'edit') {
            selectCityDiv.show();
            cityNameDiv.show();
        } else {
            selectCityDiv.hide();
            cityNameDiv.show();
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
        selectedID = selectCity.val();
        console.log(selectedID);
    });


    $('#submitButton').click(function() {
        console.log(operationType);
        if (operationType === 'add') {
            AddCity();
        } else if (operationType === 'edit') {
            EditCity();
        } else if (operationType === 'delete') {
            DeleteCity();
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
