var eventList = document.getElementById('eventList')
var HTTPRequest;
$(document).ready(function() {
    var loc = $('#location_input');
    var getzip = $('#getZip');
    getzip.click(function() { // click on event trigger
        var zipcode = loc.val();
        //constuct http request with user input
        constructHTTPRequest(zipcode);
        $.ajax(HTTPRequest).done(function (response) {
            var responseJson = response.events;
            console.log(responseJson);
            appendResults(responseJson); // assemble and display event list
        });
    });
});

function constructHTTPRequest(zipcode) {
    var date = new Date().getTime();
    var today = Math.round(date/1000);
    console.log(today);
    const thingproxy = "https://thingproxy.freeboard.io/fetch/" // thing proxy
    const yelpcall = "https://api.yelp.com/v3/events?location="; 
    var url = thingproxy +yelpcall+ zipcode+ "&start_date="+today+"&sort_on=time_start&sort_by=asc&radius=100&limit=10";
    
    // construct http request with fusion API key
    HTTPRequest = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer almpIVjLwkEeGHzkLMcGFAMtaibCg83S27FXIM_QZFxwJqfBoBiI8l4ZgKI7BimOrnm86gDhOdgr_gI6KPcwjmUSmx6eZIUdox8xjrf0P-xLfARrM0XbWFcKHFbCXHYx",
            "cache-control": "no-cache",
        }
    } 
}

// list each event with details
function appendResults(event) {
    var eventlistall = ""; //initialize event list
    for ( i= 0; i<event.length;i++){
        
        //display event name
        var name ="<li class='title list-group-item'>" + event[i].name +"</li>";
        
        // display event cost
        var eventCost = "-";
        if(event[i].cost!=null){
            eventCost = "$"+event[i].cost;
        } else if (event[i].is_free == true){
            eventCost = "Free";
        }
        cost ="<li class='list-group-item'>Cost: " + eventCost +"</li>";
        // display start time
        var time ="<li class='list-group-item'>Start Time: " + event[i].time_start.split('T')[1].slice(0,5) +"</li>";
        
        // hide google api key
        var keyPartial = "AIzaSyCTyDHuF9EJa51vkw";
        var fullAddress = event[i].location.display_address;
        
        // construct google MAP request
        var src= "src='https://www.google.com/maps/embed/v1/place?key="+keyPartial+"NqAkwnWh4ApWqvb0o &q=" +fullAddress+"'"
        
        // retrieve google map
        var map = "<li class='collapse' id='collapse-"+i+"'><iframe height = '200' width='100%' frameborder='0' style='border:0'" + src+"allowfullscreen>" +
            "</iframe></li>"
        var address = "<li class='list-group-item'>Address: " + fullAddress +"<button type='button' class='btn btn-primary' data-target='#collapse-"+i+"' data-toggle='collapse'>Find in map</button>"+ "</li>"
        
        // assemble event details
        eventlistall += name+cost+time+address+map;
        
        // display event list
        if(eventlistall!=null){
            eventList.innerHTML = eventlistall;
        }
    }
}