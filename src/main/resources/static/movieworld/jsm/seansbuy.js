
const endPoints = {
    sessions: {
        url: `${getHost()}sessions/`,
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
    bookSession: {
        url: `${getHost()}sessions/book`,
        options: {
            method: 'POST',
            headers: {
                'Authorization': ``,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: "{}"
        }
    }
};

var sessionId = -1;
var debug = false;
var session_data = null;
var movie_data = null;
var hall_data = null;

var seatNumbers = [];

function UpdateSeansData() {
    const turl = endPoints.sessions.url + `${sessionId}`;
    LoadData(turl, endPoints.sessions.options)
        .then((session) => {
            session_data = session;
            console.log(session_data);
            UpdateMoviesData();
        }
        );
}

function UpdateMoviesData() {
    const turl = endPoints.movies.url + `${session_data.movieId}`;
    LoadData(turl, endPoints.movies.options)
        .then((movie) => {
            movie_data = movie;
            console.log(movie_data);
            UpdateHallData();
        }
        );
}

function UpdateHallData() {
    const turl = endPoints.halls.url + `${session_data.hallId}`;
    LoadData(turl, endPoints.halls.options)
        .then((movie) => {
            hall_data = movie;
            console.log(hall_data);
            srenderSessions();
            renderSeats();
        }
        );
}

function srenderSessions() {
    $('.uk-placeholder').empty();
    $('.uk-placeholder').append(`<h1 class="uk-heading-line uk-text-center">${hall_data.name}</h1>`);
    $('.uk-placeholder').append(`<h1 class="uk-heading-divider uk-text-center">
    <img src="images/${movie_data.image}" style="max-height: 500px; width: auto;">
    </h1>`);
    
    let article =`
        <article class="uk-article">

        <h1 class="uk-article-title"><a class="uk-link-reset" href="">${movie_data.movieName}</a></h1>

        <p class="uk-article-meta">Director: <b>${movie_data.director}</b><br/>
        Studio: <b>${movie_data.studio}</b><br/>
        Age: <b>${movie_data.age}</b><br/>
        Rate: <b>${movie_data.rate}</b><br/>
        Year: <b>${movie_data.year}</b><br/>
        </p>
        <p class="uk-text-lead">${movie_data.description}</p>
    </article>
    `;
    $('.uk-placeholder').append(article);
}

function renderSeats() {
    const seatsGrid = document.getElementById('seatsGrid');

    for (let i = 0; i < session_data.totalSeats; i++) {
        const isOccupied = !session_data.availableSeats.includes(i+1);
        const colorClass = isOccupied ? 'uk-button-danger' : 'uk-button-success';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `seat-${i + 1}`;
        checkbox.name = `seat-${i + 1}`;
        checkbox.disabled = isOccupied;
        checkbox.checked = isOccupied;
        
        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.className = `uk-button ${colorClass}`;
        label.textContent = i + 1;
        label.style.margin = '5px';
        label.style.width = '10px';

        if (!isOccupied) {
        label.className = 'uk-button uk-button-success';
        checkbox.onclick = function() {
            bookSeat(i + 1, this);
        };
        }

        label.appendChild(checkbox);
        seatsGrid.appendChild(label);
    }

    function bookSeat(seatNumber, checkbox) {
        console.log(`Забронировано место №${seatNumber}`, checkbox.checked);

        checkbox.checked ? seatNumbers.push(seatNumber) : seatNumbers = seatNumbers.filter(item => item !== seatNumber);
        console.log(seatNumbers);
        // Добавьте логику для бронирования
    }
}


function GetSessionsByTheater() {
    const turl = endPoints.sessionsWithTheater.url + `/${sessionId}`;
    LoadData(turl, endPoints.sessionsWithTheater.options)
        .then((sessions) => {
            $('.uk-placeholder').append(`
                <table class="uk-table uk-table-striped uk-table-hover uk-table-middle">
                    <thead>
                        <tr>
                            <th class="uk-width-1-4">Назва Кино</th>
                            <th class="uk-width-1-4">Назва Театру</th>
                            <th class="uk-width-small">Ціна</th>
                            <th class="uk-width-small">Початок</th>
                            <th class="uk-width-small"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderSessions(sessions)}
                    </tbody>
                </table>
            `);
            sessions.forEach(element => {
                if (element.theatreId == sessionId) {
                    $('.uk-placeholder').append(`<p>${JSON.stringify(element, null, 4)}</p>`);
                }
            });
        }
        );
}

function renderSessions(sessions) {
    let lines = ''
    const linePattern = `
    <tr>
        <td>[name]</td>
        <td>[hall]</td>
        <td>[cost] ₴</td>
        <td>[startDate]</td>
        <td><a class="uk-button uk-button-default uk-button-small" href="javascript:console.log([sId]);">Купити</a></td>
    </tr>
    `;
    console.log(sessions);
    let line = "";
        sessions.forEach(session => {
            const hall = this.halls_data.find(hall => hall.id === session.hallId);
            const movie = this.movies_data.find(movie => movie.id === session.movieId);
            line = linePattern.replace('[hall]', hall.name );
            line = line.replace('[name]', movie.movieName );
            line = line.replace('[cost]', session.cost );
            line = line.replace('[startDate]', session.startDate );
            line = line.replace('[sId]', session.id );
            lines += line;
        });
    
    return lines;
}

function init() {
}

$(document).ready(function () {
    IsAdmin() ? $("#admin").show() : $("#admin").hide();
    const urlParams = new URLSearchParams(window.location.search);
    sessionId = urlParams.get('sessionId');
    console.log(sessionId);
    debug = urlParams.get('debug');
    debug = debug == 'true' ? true : false;

    UpdateSeansData();

    $('#buyButton').click(function() {
        console.log("BUY", seatNumbers);
    
        const delay = 500;
    
        seatNumbers.forEach((seatNumber, index) => {
            setTimeout(() => {
                const body = {
                    sessionId: sessionId,
                    toBook: seatNumber,
                };
    
                console.log(body);
    
                endPoints.bookSession.options.body = JSON.stringify(body);
                endPoints.bookSession.options.headers.Authorization = `Bearer ${GetToken()}`;
    
                LoadData(endPoints.bookSession.url, endPoints.bookSession.options)
                .then((data) => {
                    console.log(data);
                    if (index === seatNumbers.length - 1) {
                        window.location.href = `buycomplete.html?sessionId=${sessionId}`;
                    }
                });
            }, index * delay);
        });
    });
});




