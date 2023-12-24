// mokap
var cinemasData = {
    "odessa": [
        { cinemaId:1, name: "Benefit", address: "Lunaparkovaya st. 45, Odessa" },
        { cinemaId:2, name: "Herkules", address: "Narniya st. 5, Odessa" }
    ],
    "kiev": [
        { cinemaId:3, name: "Cinema A", address: "Adress A, Kiev" },
        { cinemaId:4, name: "Cinema B", address: "Adress B, Kiev" }
    ],
    "lutsk": [
        { cinemaId:5, name: "Cinema X", address: "Adress X, Lutsk" },
        { cinemaId:6, name: "Cinema Y", address: "Adress Y, Lutsk" }
    ]
};


$(document).ready(function() {
    $('#cities').change(function() {
        var selectedCity = $(this).val();
        var cinemas = cinemasData[selectedCity];

        if (selectedCity !== "" && cinemas) {
            $('#cinemaBody').empty();

            $.each(cinemas, function(index, cinema) {
                var row = '<tr>' +
                            '<td>' + cinema.name + '</td>' +
                            '<td>' + cinema.address + '</td>' +
                            '<td><button class="sessionButton" data-cinema="' + cinema.cinemaId + '">Seanses</button></td>' +
                          '</tr>';
                $('#cinemaBody').append(row);
            });

            $('#cinemaTable').show();

            $('.sessionButton').click(function() {
                var cinemaName = $(this).data('cinema');

                window.open('sessions.html?cinemaId=' + encodeURIComponent(cinemaName), '_self');
            });
        } else {
            $('#cinemaTable').hide();
        }
    });
});