
// events API

$("#submit").on("click", function (event) {
    event.preventDefault();
    $("#eventbrite").empty();
    var country = $("#searchCountry").val().trim();
    var city = $("#searchCity").val().trim();
    var date = $("#searchDate").val().trim();
    console.log(country);
    console.log(city);
    console.log(date);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.eventbriteapi.com/v3/events/search/",
        "data": { token: 'DEF3J2HCZTGKJ6OAD6LF', sort_by: 'best', 'location.address': city, 'location.within': '10km', 'start_date.range_start': date + "T00:00:00Z", locale: 'en_US', expand: 'venue' },
        "method": "GET"
    }
    $.ajax(settings).done(function (data) {
        console.log(data);
        for (var i = 0; i < data.events.length; i++) {
            if (data.events[i].description.text.indexOf(country)) {
                var newDiv = $("<div>").addClass("col-md-12 m-4").html(`
                <p>Date: <b>${data.events[i].start.local.substr(0, 10)}</b> | Timezone: <b>${data.events[i].start.timezone}</b></p>
                <h2>${data.events[i].name.text}</h2>
                ${data.events[i].description.text}
               `);
            };
            $("#eventbrite").append(newDiv);
        };
    });
})

