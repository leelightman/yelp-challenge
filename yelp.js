var eventList = document.getElementById('eventList')
var zipcode;
var responseJson;
const apicall = "https://thingproxy.freeboard.io/fetch/https://api.yelp.com/v3/events?location=";
var url;
var HTTPRequest;
$(document).ready(function() {
    var loc = $('#location_input');
    var getzip = $('#getZip');
    getzip.click(function() {
        zipcode = loc.val();
        constructHTTPRequest(zipcode);
        $.ajax(HTTPRequest).done(function (response) {
            responseJson = response.events;
            appendResults(responseJson);
            console.log(response);
        });
    });
});

function constructHTTPRequest(userinput) {
    var date = new Date().valueOf();
    var today = Math.round(date/1000);
    url = apicall + zipcode+ "&start_date="+today+"&sort_on=time_start&sort_by=asc&radius=1600&limit=10";
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

function createTag(element)
{
    return document.createElement(element);

}

function append(parent, el)
{
    return parent.appendChild(el);
}



function appendResults(event) {
    var eventlistall = "";
    for ( i= 0; i<event.length;i++){
        var name ="<li class='title list-group-item'>" + event[i].name +"</li>";
        var eventCost = "-";
        if(event[i].cost!=null){
            eventCost = event[i].cost;
        }
        cost ="<li class='list-group-item'>Cost: $" + eventCost +"</li>";
        var time ="<li class='list-group-item'>Time: " + event[i].time_start.split('T')[0] +"</li>";
        var fullAddress = event[i].location.display_address;
        var src= "src='https://www.google.com/maps/embed/v1/place?key=AIzaSyCTyDHuF9EJa51vkwNqAkwnWh4ApWqvb0o &q=" +fullAddress+"'"

        var map = "<li class='collapse' id='collapse-"+i+"'><iframe height = '200' width='100%' frameborder='0' style='border:0'" + src+"allowfullscreen>" +
            "</iframe></li>"
        var address = "<li class='list-group-item'>Address: " + fullAddress +"<button type='button' class='btn btn-primary' data-target='#collapse-"+i+"' data-toggle='collapse'>Find in map</button>"+ "</li>"
        eventlistall += name+cost+time+address+map;
        if(eventlistall!=null){
            eventList.innerHTML = eventlistall;
        }
    }
}