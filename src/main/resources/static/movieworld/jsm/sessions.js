var cinemasData = null;

const endPoints = {
    theatre: {
        url: 'http://192.168.0.179:8080/theatres/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    halls: {
        url: 'http://192.168.0.179:8080/halls/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    sessions: {
        url: 'http://192.168.0.179:8080/sessions/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    },
    movies: {
        url: 'http://192.168.0.179:8080/movies/',
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
    }
};


this.ard = [];
this.asrdCount = 0;

function GetTheatre(n) {
    const turl = endPoints.theatre.url + n;
    LoadData(turl, endPoints.theatre.options)
        .then((theatre) => {
            $('.uk-placeholder').empty();
            $('.uk-placeholder').append(`<h1 class="uk-heading-line uk-text-center">${theatre.cityName}</h1>`);
            $('.uk-placeholder').append(`<h1 class="uk-heading-divider">${theatre.address}</h1>`);
            $('.uk-placeholder').append(`<h1 class="uk-heading-bullet">${theatre.theatreName}</h1>`);
            this.GetSessions(n);
        }
        );
}

function GetSessions(n) {
    const turl = endPoints.sessions.url;
    LoadData(turl, endPoints.sessions.options)
        .then((sessions) => {
            this.GetHalls(sessions, n);
        }
        );
}

// TODO мабуть ліпше запитати halls sessions movies а потім формувати таблицю

function GetHalls(sessions, n) {
    const turl = endPoints.halls.url;
    LoadData(turl, endPoints.halls.options)
        .then((halls) => {
            $('.uk-placeholder').append(`<p>HALLS:</br>${JSON.stringify(halls, null, 4)}</p>`);
            $('.uk-placeholder').append(`<p>SESSIONS:</br>${JSON.stringify(sessions, null, 4)}</p>`);

            $('.uk-placeholder').append(`
                <table class="uk-table uk-table-striped">
                    <thead>
                        <tr>
                            <th class="uk-width-1-4">Movie name</th>
                            <th class="uk-width-1-4">Hall name</th>
                            <th class="uk-width-small">Ticket price</th>
                            <th class="uk-width-small">Start time</th>
                            <th class="uk-width-small">Duration</th>
                            <th class="uk-width-small">Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderLines(halls, sessions, n)}
                    </tbody>
                </table>
            `);
            halls.forEach(element => {
                if (element.theatreId == n) {
                    $('.uk-placeholder').append(`<p>${JSON.stringify(element, null, 4)}</p>`);
                }
            });
        }
        );
}


function renderLines(halls, sessions, n) {
    let lines = ''
    const linePattern = `
    <tr>
        <td>[name]</td>
        <td>[hall]</td>
        <td>[cost] ₴</td>
        <td>[startDate]</td>
        <td>1h 20m</td>
        <td><a class="uk-button uk-button-default" href="#">Buy</a></td>
    </tr>
    `;

    let line = "";
    halls.forEach(hall => {
        if (hall.theatreId == n) {
            line = linePattern.replace('[hall]', hall.name );
            let hallId = hall.id;
            
            sessions.forEach(session => {
                console.log(hallId, session.hallId);
                if (session.hallId == hallId) {
                    line = line.replace('[name]', session.movieId );
                    line = line.replace('[cost]', session.cost );
                    line = line.replace('[startDate]', session.startDate );
                }
            });

            lines += line;
        }
    });

    return lines;
}



function init() {
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get('cinemaId');
    console.log(cinemaId);

    GetTheatre(cinemaId);
});




