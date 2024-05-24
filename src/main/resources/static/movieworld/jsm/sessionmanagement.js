selectedCityID = -1;
selectedTheatreID = -1;
operationType = "";
moviesData = null;

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
    moviesCreate_: {
        url: `${getHost()}movies/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    moviesUpdate_: {
        url: `${getHost()}movies/create`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    },
    moviesDelete_: {
        url: `${getHost()}movies/`,
        options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};

function GetMovies() {
    LoadData(endPoints.movies.url, endPoints.movies.options)
        .then((data) => {
            moviesData = data;
            $('#selectSession').empty();
            
            $('#movieName').val('');
            $('#image').val('');
            $('#year').val('');
            $('#director').val('');
            $('#studio').val('');
            $('#rate').val('');
            $('#age').val('');

            let movieNames = '<option value="-1">Select Movie</option>';
            data.forEach(element => {
                let line = `<option value="${element.id}">${element.movieName}</option>`;
                movieNames += line;
            });

            $('#selectMovie').append(`${movieNames}`);
        }
        );
}

function AddMovie() {
    const body = {
        movieName: $('#movieName').val(),
        image: $('#image').val(),
        year: $('#year').val(),
        director: $('#director').val(),
        studio: $('#studio').val(),
        rate: $('#rate').val(),
        age: $('#age').val(),
        description: $('#description').val(),
    }
    console.log(body);
    endPoints.moviesCreate.options.body = JSON.stringify(body);
    endPoints.moviesCreate.options.headers.Authorization = `Bearer ${GetToken()}`;
    console.log(endPoints.moviesCreate.options.body);
    console.log(endPoints.moviesCreate.options.headers);
    LoadData(endPoints.moviesCreate.url, endPoints.moviesCreate.options)
        .then((data) => {
            console.log(data);
            location.reload();
        }
        );
}

function DeleteMovie() {
    if (selectedTheatreID < 0) {
        return;
    }
    endPoints.moviesDelete.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.moviesDelete.url + selectedTheatreID, endPoints.moviesDelete.options)
        .then((data) => {
            console.log(data);
            GetMovies();
        }
        );

}

function EditMovie() {
    if (selectedTheatreID < 0) {
        return;
    }

    const body = {
        movieName: $('#movieName').val(),
        image: $('#image').val(),
        year: $('#year').val(),
        director: $('#director').val(),
        studio: $('#studio').val(),
        rate: $('#rate').val(),
        age: $('#age').val(),
        description: $('#description').val(),
        id: Number($('#selectMovie').val()),
    }
    endPoints.moviesUpdate.options.body = JSON.stringify(body);
    endPoints.moviesUpdate.options.headers.Authorization = `Bearer ${GetToken()}`;
    LoadData(endPoints.moviesUpdate.url, endPoints.moviesUpdate.options)
        .then((data) => {
            console.log(data);
            GetMovies();
        }
        );
}


function main() {
    GetMovies();

    const actionSelect = $('#action');
    const selectMovie = $('#selectMovie');
    const movieDataDiv = $('#movieDataDiv');
    const selectSessionDiv = $('#selectSessionDiv');
    const submitBtnDiv = $('#submitBtnDiv');
    const testButton = $('#testButton');

    actionSelect.on('change', function() {
        $('#selectMovie').val(-1);

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

    selectMovie.on('change', function() {
        var selectedText = selectMovie.find('option:selected').text();
        $('#movieName').val(selectedText);
        selectedTheatreID = Number(selectMovie.val());
        moviesData.forEach(element => {
            if (Number(element.id) === selectedTheatreID) {
                $('#movieName').val(element.movieName);
                $('#image').val(element.image);
                $('#year').val(element.year);
                $('#director').val(element.director);
                $('#studio').val(element.studio);
                $('#rate').val(element.rate);
                $('#age').val(element.age);
            }

            if (selectedTheatreID === -1) {
                $('#movieName').val("");
                $('#image').val("");
                $('#year').val("");
                $('#director').val("");
                $('#studio').val("");
                $('#rate').val("");
                $('#age').val("");
            }
        })
        console.log(selectedTheatreID);
    });


    $('#submitButton').click(function() {
        console.log(operationType);
        if (operationType === 'add') {
            // AddMovie();
        } else if (operationType === 'edit') {
            // EditMovie();
        } else if (operationType === 'delete') {
            // DeleteMovie();
        }
    });

    $('#testButton').click(function() {
        const startDateValue = $('#startDate').val();

        console.log(startDateValue);
    });
}

$(document).ready(function() {
    if (IsAdmin()) {
        main();
    } else {
        $('.uk-container.uk-container-xsmall').hide();
    }



    UIkit.use('datepicker');
    UIkit.use('timepicker');

    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');

    UIkit.datepicker(startDateInput, {
        format: 'YYYY-MM-DD'
    });

    UIkit.timepicker(startTimeInput, {
        format: 'HH:mm'
    });
});
