selectedCityID = -1;
selectedTheatreID = -1;
operationType = "";
moviesData = null;
sessionsData = null;
hallsData = null;

const endPoints = {
    cityes: {
        url: `${getHost()}cities`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    movies: {
        url: `${getHost()}movies`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    halls: {
        url: `${getHost()}halls`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    sessions: {
        url: `${getHost()}sessions`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    sessionCreate: {
        url: `${getHost()}sessions/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    sessionUpdate: {
        url: `${getHost()}sessions/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    sessionDelete: {
        url: `${getHost()}sessions/`,
        options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};

function GetSessions() {
    LoadData(endPoints.sessions.url, endPoints.sessions.options)
        .then((data) => {
            sessionsData = data;
            $('#selectSession').empty();

            let sessionsNames = '<option value="-1">Select Session</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.id} [${convertDateFormat(element.startDate)}] ${element.movieName}</option>`;
                sessionsNames += line;
            });
            
            $('#selectSession').append(`${sessionsNames}`);
        }
        );
}

function GetMovies() {
    LoadData(endPoints.movies.url, endPoints.movies.options)
        .then((data) => {
            moviesData = data;
            $('#selectMovie').empty();

            let movieNames = '<option value="-1">Select Movie</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.movieName}</option>`;
                movieNames += line;
            });

            $('#selectMovie').append(`${movieNames}`);
        }
        );
}

function GetHalls() {
    LoadData(endPoints.halls.url, endPoints.halls.options)
        .then((data) => {
            hallsData = data;
            $('#selectHall').empty();

            let hallNames = '<option value="-1">Select Hall</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.name} [${element.theatreName}]</option>`;
                hallNames += line;
            });

            $('#selectHall').append(`${hallNames}`);
        }
        );
}

function AddSession() {
    const body = {
        startDate: $('#startDate').val() + ":36Z",
        cost: Number($('#cost').val()),
        movieId: Number($('#selectMovie').val()),
        hallId: Number($('#selectHall').val()),
    }
    const valid = body.startDate && body.cost && body.cost > 0 && body.movieId > 0 && body.hallId > 0;
    console.log(body);
    if (valid) {
        console.log(valid);
        endPoints.sessionCreate.options.body = JSON.stringify(body);
        endPoints.sessionCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
        console.log(endPoints.sessionCreate.options.body);
        console.log(endPoints.sessionCreate.options.headers);
        LoadData(endPoints.sessionCreate.url, endPoints.sessionCreate.options)
            .then((data) => {
                console.log(data);
                location.reload();
            }
            );
    }
}

function DeleteMovie() {
    if (selectedTheatreID < 0) {
        return;
    }
    endPoints.sessionDelete.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.sessionDelete.url + selectedTheatreID, endPoints.sessionDelete.options)
        .then((data) => {
            console.log(data);
            location.reload();
        }
        );

}

function EditSession() {
    if (selectedTheatreID < 0) {
        return;
    }

    const body = {
        startDate: $('#startDate').val() + ":36Z",
        cost: Number($('#cost').val()),
        movieId: $('#selectMovie').val(),
        hallId: $('#selectHall').val(),
    }
    const valid = body.startDate && body.cost && body.cost > 0 && body.movieId > 0 && body.hallId > 0;
    console.log(body);
    if (valid) {
        console.log(valid);
        endPoints.sessionUpdate.options.body = JSON.stringify(body);
        endPoints.sessionUpdate.options.headers.Authorization = `Bearer ${GetToken()}`;
        console.log(endPoints.sessionUpdate.options.body);
        console.log(endPoints.sessionUpdate.options.headers);
        LoadData(endPoints.sessionUpdate.url, endPoints.sessionUpdate.options)
            .then((data) => {
                console.log(data);
                location.reload();
            }
            );
    }
}


function main() {
    GetSessions();
    GetMovies();
    GetHalls();

    const actionSelect = $('#action');
    const selectMovie = $('#selectMovie');
    const selectHall = $('#selectHall');
    const selectSession = $('#selectSession');
    const movieDataDiv = $('#movieDataDiv');
    const selectSessionDiv = $('#selectSessionDiv');
    const submitBtnDiv = $('#submitBtnDiv');
    const testButton = $('#testButton');

    actionSelect.on('change', function () {
        selectMovie.val(-1);
        selectHall.val(-1);
        selectSession.val(-1);

        if (actionSelect.val() === 'none') {
            movieDataDiv.hide();
        } else if (actionSelect.val() === 'delete') {
            selectSessionDiv.show();
            movieDataDiv.hide();
        } else if (actionSelect.val() === 'edit') {
            selectSessionDiv.show();
            movieDataDiv.show();
        } else {
            selectSessionDiv.hide();
            movieDataDiv.show();
        }

        if (actionSelect.val() !== '') {
            submitBtnDiv.show();
        } else {
            submitBtnDiv.hide();
        }

        operationType = actionSelect.val();
        console.log(operationType);

    });

    selectSession.on('change', function () {
        var selectedText = selectSession.find('option:selected').text();
        $('#movieName').val(selectedText);
        selectedTheatreID = Number(selectSession.val());
        sessionsData.forEach(element => {
            if (Number(element.id) === selectedTheatreID) {
                // $('#startDate').val(element.startDate);
                // $('#cost').val(element.cost);
                // $('#selectMovie').val(element.selectMovie);
                // $('#selectHall').val(element.director);
            }

            if (selectedTheatreID === -1) {
                // $('#startDate').val("");
                // $('#cost').val("");
                // $('#selectMovie').val("");
                // $('#selectHall').val("");
            }
        })
        console.log(selectedTheatreID);
    });


    $('#submitButton').click(function () {
        console.log(operationType);
        if (operationType === 'add') {
            AddSession();
        } else if (operationType === 'edit') {
            // EditSession();
        } else if (operationType === 'delete') {
            DeleteMovie();
        }
    });

    testButton.click(function () {
        const startDateValue = $('#startDate').val();

        console.log(startDateValue);
    });
}

$(document).ready(function () {
    if (IsAdmin()) {
        main();
    } else {
        $('.uk-container.uk-container-xsmall').hide();
    }

    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');
});
