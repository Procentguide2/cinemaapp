selectedHallID = -1;
selectedTheatreID = -1;
operationType = "";
theatersData = null;

const endPoints = {
    theatres: {
        url: `${getHost()}theatres`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    hallsCreate: {
        url: `${getHost()}halls/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    hallsDelete: {
        url: `${getHost()}halls/`,
        options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    halls: {
        url: `${getHost()}halls`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};

function GetTheatres() {
    LoadData(endPoints.theatres.url, endPoints.theatres.options)
        .then((data) => {
            theatersData = data;
            console.log(data);
            $('#selectTheatre').empty();
            $('#seats').empty();
            $('#theatreName').val('');
            $('#seats').val('');
            let theatreNames = '<option value="-1">Select Theatre</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.theatreName}</option>`;
                theatreNames += line;
            });

            $('#selectTheatre').append(`${theatreNames}`);
        }
        );
}

function GetHalls() {
    LoadData(endPoints.halls.url, endPoints.theatres.options)
        .then((data) => {
            theatersData = data;
            console.log(data);
            $('#selectHall').empty();
            $('#seats').empty();
            $('#theatreName').val('');
            $('#seats').val('');
            let hallNames = '<option value="-1">Select Hall</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.name}</option>`;
                hallNames += line;
            });

            $('#selectHall').append(`${hallNames}`);
        }
        );
}

function AddHall() {
    if (selectedTheatreID < 0) {
        return;
    }

    const body = {
        name: $('#hallName').val(),
        seats: $('#seats').val(),
        theatreId: selectedTheatreID,
    }
    console.log(body);
    endPoints.hallsCreate.options.body = JSON.stringify(body);
    endPoints.hallsCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    console.log(endPoints.hallsCreate.options.body);
    console.log(endPoints.hallsCreate.options.headers);
    LoadData(endPoints.hallsCreate.url, endPoints.hallsCreate.options)
        .then((data) => {
            console.log(data);
            location.reload();
        }
        );
}

function DeleteHall() {
    if (selectedHallID < 0) {
        return;
    }
    endPoints.hallsDelete.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.hallsDelete.url + selectedHallID, endPoints.hallsDelete.options)
        .then((data) => {
            console.log(data);
            GetHalls();
            GetTheatres();
        }
        );

}

function main() {
    GetHalls();
    GetTheatres();

    const form = $('#cityForm');
    const actionSelect = $('#action');
    const selectHall = $('#selectHall');
    const selectHallDiv = $('#selectHallDiv');
    const selectTheatre = $('#selectTheatre');
    const hallDataDiv = $('#hallDataDiv');
    const submitBtnDiv = $('#submitBtnDiv');

    actionSelect.on('change', function() {

        $('#selectHall').val(-1);
        $('#selectTheatre').val(-1);
        $('#theatreName').val('');
        $('#seats').val('');

        if (actionSelect.val() === 'none') {
            selectHallDiv.hide();
            hallDataDiv.hide();
        } else if (actionSelect.val() === 'delete') {
            selectHallDiv.show();
            hallDataDiv.hide();
        } else if (actionSelect.val() === 'edit') {
            selectHallDiv.hide();
            hallDataDiv.show();
        } else {
            selectHallDiv.hide();
            hallDataDiv.show();
        }

        if (actionSelect.val() !== '') {
            submitBtnDiv.show();
        } else {
            submitBtnDiv.hide();
        }

        operationType = actionSelect.val();
        console.log(operationType);

    });

    selectHall.on('change', function() {
        var selectedText = selectHall.find('option:selected').text();
        $('#cityName').val(selectedText);
        selectedHallID = Number(selectHall.val());
        console.log(selectedHallID);
    });

    selectTheatre.on('change', function() {
        selectedTheatreID = Number(selectTheatre.val());
        console.log(selectedTheatreID);
    });


    $('#submitButton').click(function() {
        console.log(operationType);
        if (operationType === 'add') {
            AddHall();
        } else if (operationType === 'delete') {
            DeleteHall();
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
