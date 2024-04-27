
const endPoints = {
    theatre: {
        url: `${getHost()}theatres/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    movies: {
        url: `${getHost()}movies/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    halls: {
        url: `${getHost()}halls/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    sessions: {
        url: `${getHost()}sessions/`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    sessionsWithTheater: {
        url: `${getHost()}sessions/theater`,
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};

var cinemaId = -1;
var debug = false;
var selectedMovie = -1;

this.movies_data;
this.theatre_data;
this.halls_data;
this.sessions_data;
this.sessionsWithHall_data;
this.sessionsWithTheater_data;


function UpdateMoviesData() {
    const turl = endPoints.movies.url;
    LoadData(turl, endPoints.theatre.options)
        .then((movies) => {
            this.movies_data = movies;
            UpdateTheatreData();
        }
        );
}

function UpdateTheatreData() {
    const turl = endPoints.theatre.url;
    LoadData(turl, endPoints.theatre.options)
        .then((theatre) => {
            this.theatre_data = theatre;
            const th = this.theatre_data.find(element => element.id == cinemaId);
            $('.uk-placeholder').empty();
            $('.uk-placeholder').append(`<h1 class="uk-heading-line uk-text-uppercase uk-text-center">${th.cityName}</h1>`);
            $('.uk-placeholder').append(`<h1 class="uk-heading-divider uk-text-muted uk-text-small uk-text-top uk-text-center">${th.address}</h1>`);
            $('.uk-placeholder').append(`<h1 class="uk-heading-bullet">${th.theatreName}</h1>`);

            let select = `<div class="uk-margin">
                            <label for="movie">Оберить кино:</label>
                            <select id="movie" name="movie" class="uk-select" required>
                                <option value="-1">Всі стрічки</option>
                                [movies]
                            </select>
                            </div>`;
            select = select.replace('[movies]', this.movies_data.map(m => `<option value="${m.id}">${m.movieName}</option>`).join(''));
            $('.uk-placeholder').append(select);

            UpdateHallsData();
        }
        );
}

function UpdateHallsData() {
    const turl = endPoints.halls.url;
    LoadData(turl, endPoints.halls.options)
        .then((halls) => {
            this.halls_data = halls;
            UpdateSessionsData();
        }
        );
}

function UpdateSessionsData() {
    const turl = endPoints.sessions.url;
    LoadData(turl, endPoints.sessions.options)
        .then((sessions) => {
            this.sessions_data = sessions;

            GetSessionsByTheater();

            if (debug) {
                console.log(cinemaId);
                $('.uk-placeholder').append(`<p>movies_data:</br>${JSON.stringify(this.movies_data, null, 4)}</p>`);
                $('.uk-placeholder').append(`<p>theatre_data:</br>${JSON.stringify(this.theatre_data, null, 4)}</p>`);
                $('.uk-placeholder').append(`<p>halls_data:</br>${JSON.stringify(this.halls_data, null, 4)}</p>`);
                $('.uk-placeholder').append(`<p>sessions_data:</br>${JSON.stringify(this.sessions_data, null, 4)}</p>`);
            }
        }
        );
}

function GetSessionsByTheater() {
    const turl = endPoints.sessionsWithTheater.url + `/${cinemaId}`;
    LoadData(turl, endPoints.sessionsWithTheater.options)
        .then((sessions) => {
            this.sessionsWithTheater_data = sessions;
            $('.uk-placeholder').append(`<div id="table-div" class="uk-margin"></div>`);
            renderTable();
            addEventHendlers();
        }
        );
}

function renderTable() {
    $('#table-div').append(`
                <div id="table-div" class="uk-margin">
                <table class="uk-table uk-table-striped uk-table-hover uk-table-middle">
                    <thead>
                        <tr>
                            <th class="uk-width-1-4">Назва Кино</th>
                            <th class="uk-width-1-4">Назва Залу</th>
                            <th class="uk-width-small">Ціна</th>
                            <th class="uk-width-small">Початок</th>
                            <th class="uk-width-small"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        ${renderSessions(this.sessionsWithTheater_data)}
                    </tbody>
                </table>
                </div>
            `);
}

function renderSessions(sessions) {
    let lines = ''
    const linePattern = `
    <tr>
        <td>[name]</td>
        <td>[hall]</td>
        <td>[cost] ₴</td>
        <td>[startDate]</td>
        <td><a class="uk-button uk-button-default uk-button-small" href="seansbuy.html?sessionId=[sessionId]">Купити</a></td>
    </tr>
    `;
    console.log(sessions);
    let line = "";
        sessions.forEach(session => {
            const hall = this.halls_data.find(hall => hall.id === session.hallId);
            const movie = this.movies_data.find(movie => movie.id === session.movieId);
            console.log(movie.id, selectedMovie);
            if (selectedMovie === movie.id || selectedMovie === -1) {
                line = linePattern.replace('[hall]', hall.name );
                line = line.replace('[name]', movie.movieName );
                line = line.replace('[cost]', session.cost );
                line = line.replace('[startDate]', convertDateFormat(session.startDate));
                line = line.replace('[sessionId]', session.id );
                lines += line;
            }
        });
    
    console.log(lines);
    return lines;
}

function convertDateFormat(inputDate) {
    const monthNames = [
      "січня", "лютого", "березня", "квітня", "травня", "червня",
      "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${day} ${monthNames[monthIndex]} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDate;
  }

function init() {
}

function addEventHendlers() {
    const selectMovie = $('#movie');
    console.log(selectMovie);
    selectMovie.on('change', function() {
        let selectedVal = selectMovie.find('option:selected').val();
        console.log(selectedVal);
        selectedMovie = Number(selectedVal);
        $('#table-div').empty();
        renderTable();
    });
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    cinemaId = urlParams.get('cinemaId');
    debug = urlParams.get('debug');
    debug = debug == 'true' ? true : false;
    
    UpdateMoviesData();
    
    IsAdmin() ? $("#admin").show() : $("#admin").hide();
});




