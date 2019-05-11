
// events API

// current date for date input value 
$("#searchDate").val(moment().format('YYYY-MM-DD'));
// location service to find current location
$.get("https://ipinfo.io", function (response) {
    // current location for location input value
    $("#searchCity").val(response.city + ", " + response.postal);
}, "jsonp");
// clear input value on focus
// $('input').on('click focusin', function () {
//     this.value = '';
// });

// START onclick event to load the API data
$("#submit").on("click", function (event) {
    // prevent default click scenario
    event.preventDefault();
    // clear main div (#eventbrite)
    $("#eventbrite").empty();
    // input variables
    var city = $("#searchCity").val().trim();
    var date = $("#searchDate").val().trim();
    var title = $("#searchTitle").val().trim();
    console.log(city);
    console.log(date);
    console.log(title);
    // settings for API connect
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.eventbriteapi.com/v3/events/search/",
        "data": { token: 'DEF3J2HCZTGKJ6OAD6LF', sort_by: 'best', 'location.address': city, 'location.within': '10km', 'start_date.range_start': date + "T00:00:00Z", locale: 'en_US', expand: 'venue' },
        "method": "GET"
    }
    // START AJAX
    $.ajax(settings).done(function (data) {
        console.log(data);
        // div for left column 
        var newDiv1 = $("<div>").addClass("col-md-5 nav flex-column nav-pills").attr({
            id: "v-pills-tab", role: "tablist", "aria-orientation": "vertical"
        });
        // div for right column 
        var newDiv2 = $("<div>").addClass("col-md-7 tab-content").attr("id", "v-pills-tabContent");

        // START loop for data
        for (var i = 0; i < data.events.length; i++) {
            // conditions for event title search
            if (data.events[i].name.text.includes(title) === true || data.events[i].description.text.includes(title) === true) {
                // left column div inner data
                var newDiv3 = $("<a>").addClass("nav-link").attr({ id: "v-pills-" + i + "-tab", "data-toggle": "pill", href: "#v-pills-" + i, role: "tab", "aria-controls": "v-pills-" + i, "aria-selected": "true" }).html(`
            <div class="eventsFrame">
            <div class="eventdate">
				<div class="eventday">${$.format.date(data.events[i].start.local, "dd")}</div>
                <div class="eventmonth">${$.format.date(data.events[i].start.local, "MMMM")}</div>
			</div>
            <h2>${data.events[i].name.text}</h2>
            </div>`);
                // add ACTIVE class for first child of LEFT column div
                newDiv1.find('a:first-of-type').addClass('active');
                // right column div inner data       
                var newDiv4 = $("<div>").addClass("tab-pane fade show description make-me-sticky").attr({ id: "v-pills-" + i, role: "tabpannel", "aria-labelledby": "v-pills-" + i + "-tab" }).html(`
                <div class="content">
                <img src="${data.events[i].logo.url}" style="width:100%;">
                <div class="row mt-4">
                <div class="col-md-9">
                <h2>${data.events[i].name.text}</h2>
                <p>${data.events[i].description.html}</p>
                </div>
                <div class="col-md-3">
                <h4 class="dateNtime">Date and Time</h4>
                <p>${$.format.date(data.events[i].start.local, "E, MMMM dd, yyyy")}
                <br>${$.format.date(data.events[i].start.local, "hh:mm a")}</p>
                <h4 class="mt-5">Location</h4>
                <p>${data.events[i].venue.address.localized_address_display}</p>
                </div>
                </div>
                <a href="${data.events[i].url}" target="_blank" class="linkButton"><i class="fas fa-external-link-alt fa-2x"></i></a>
                `);
                // add ACTIVE class for first child of RIGHT column div        
                newDiv2.find('div:first-of-type').addClass('active');
                // appending inner data to left and right divs                
                newDiv1.append(newDiv3);
                newDiv2.append(newDiv4);
                // appending left and right columns to main div (#eventbite)
                $("#eventbrite").append(newDiv1);
                $("#eventbrite").append(newDiv2);
            } // END of IF conditional
            // ELSE conditional for no reslut
            // else {
            //     $("#eventbrite").empty();
            //     $("#eventbrite").html("<h1 class='text-center'>No results found</h2>");
            // }
        }; // END loop for data

    }); // END AJAX
}) // END onclick event to load the API data

// JS for date calendar
$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});

