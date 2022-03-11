// Yelp Client ID: wp7597Dfcw2BqYz9TuhdRg
// Yelp API Key: API Key: qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx

var zipcode = document.querySelector("#zipcode");
var submit = document.querySelector("#submit");
var filter = document.querySelectorAll(".filter");
var filterResults = [];
var yelpTable = $(".yelpTable");
var yelpData = $(".yelpData");
var userCord = ""


var YURL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

var apiKey =
  "qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx";

function getYelp() {
  var requestObj = {
    url: YURL,
    data: {
      term: "restaurants",
      location: `${zipcode.value}`,
      categories: `${filterResults.join()}`,
    },
    headers: { Authorization: `Bearer ${apiKey}` },
  };

  $.ajax(requestObj).done(function (response) {
    console.log(response);

    var yelpResults = response.businesses;
    console.log(yelpResults[0].name);
    for (i = 0; i < yelpResults.length; i++) {
      var tr = $('<tr class="yelpData">');
      var Name = $("<td>");
      var Picture = $("<td>");
      var Address = $("<td>");
      Name.text(yelpResults[i].name);
      Address.text(yelpResults[i].location.address1);
      Picture.prepend(`<img src=${yelpResults[i].image_url} />`);
      yelpTable.append(tr);
      tr.append(Name);
      tr.append(Picture);
      tr.append(Address);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        alert("lat:" + lat + " lng:" + lng);
        userCord = `${lat},${lng}`;
      });
    }


    var Ocoordinates = `${yelpResults[0].coordinates.latitude},${yelpResults[0].coordinates.longitude}`;
    console.log(userCord);
    var mapURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${Ocoordinates}&destinations=${userCord}&departure_time=now&key=AIzaSyBqzdfcQm6Qg655NWXOiRgLVsdk8yP5Qxg`;

    //rows -> elements -> distance shit
    console.log(Ocoordinates);
    console.log(userCord)

    fetch(mapURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  });
}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  yelpData.remove();

  for (i = 0; i < filter.length; i++) {
    if (filter[i].checked) {
      filterResults.push(filter[i].value);
    }
  }

  getYelp();

  console.log(zipcode.value);
  console.log(filterResults.join());
  console.log(filterResults);
});

function addRestaurants() {
  var businesses = yelpResults[0];
  for (i = 0; i < response.length; i++) var tr = $('<tr class="yelpData>');
  var Name = $('<td class="yelpData>');
  var Picture = $('<td class="yelpData>');
  var Address = $('<td class="yelpData>');

  Name.text(businesses[i].name);
  console.log(Name);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    alert("lat:" + lat + " lng:" + lng);
    userCord = `${lat},${lng}`;
  });
}

function geoSuccess(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  alert("lat:" + lat + " lng:" + lng);
  userCord = `${lat},${lng}`;
}
console.log(userCord);
