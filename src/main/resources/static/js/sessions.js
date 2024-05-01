const sessionsData = {
    1: {
        "name": "Benefit",
        "adress": "Lunaparkovaya st. 45",
        "sessions": [
            { film: "Matador", hall: "Hall 1", price: "100 grn", startTime: "15:00", duration: "2 h", freeSeats: [1, 23, 4] },
            { film: "Halo 45", hall: "Hall 2", price: "120 grn", startTime: "17:30", duration: "1.5 h", freeSeats: [3, 45, 4] }
        ],
    },
    2: {
        "name": "Herkules",
        "adress": "Narniya st. 5",
        "sessions": [
            { film: "Gazoline day", hall: "Hall 3", price: "90 grn", startTime: "16:45", duration: "2.5 h", freeSeats: [4, 2, 6] },
            { film: "Dynotopiya", hall: "Hall 4", price: "110 grn", startTime: "19:00", duration: "2 h", freeSeats: [5, 23] }
        ]
    }
    // add more mocap
};



$(document).ready(function() {
    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get('cinemaId');

    // call API
    //

    if (sessionsData[cinemaId]) {
        $('#cinemaName').text(sessionsData[cinemaId].name);
        $('#cinemaAddress').text(sessionsData[cinemaId].adress);
        const sessions = sessionsData[cinemaId].sessions;
        const sessionsBody = $('#sessionsBody');

        sessions.forEach(session => {
            const row = '<tr>' +
                '<td>' + session.film + '</td>' +
                '<td>' + session.hall + '</td>' +
                '<td>' + session.price + '</td>' +
                '<td>' + session.startTime + '</td>' +
                '<td>' + session.duration + '</td>' +
                '<td>' + session.freeSeats + '</td>' +
                '<td><button class="sessionButton" data-cinema="' + session.price + '">buy</button></td>' +
                '</tr>';
            sessionsBody.append(row);
        });
    }
});