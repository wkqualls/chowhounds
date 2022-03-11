// Yelp Client ID: wp7597Dfcw2BqYz9TuhdRg
// Yelp API Key: API Key: qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx

var zipcode = document.querySelector("#zipcode");
var submit = document.querySelector("#submit");
var filter = document.querySelectorAll(".filter");
var filterResults = [];
var yelpTable = $(".yelpTable");
var yelpData = $(".yelpData");
var userCord = ""

    //Getting User Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
  
        userCord = `${lat},${lng}`;
      });
    }

// YELP Api Info

var YURL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

var apiKey =
  "qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx";


  // Function that gets all the data from Yelp and Google Maps - Direction Matrix
function getData() {


  // Fetching Yelp Data
  var requestObj = {
    'url': YURL,
    'data': {term: 'restaurants', location: zipcode.value, categories:`${filterResults.join()}`},
    headers: {'Authorization':`Bearer ${apiKey}`}
  }

  $.ajax(requestObj).done(function (response) {
    console.log(response);


    // Creating Table based on Data from Yelp API
    var yelpResults = response.businesses;
    for (i = 0; i < yelpResults.length; i++) {
      var tr = $('<tr class="yelpData">');
      var Picture = $("<td>");
      var Name = $("<td>");
      var Address = $("<td>");
      var button = $(`<td id=${i} class = "button">`);
      Name.text(yelpResults[i].name);
      Address.text(`${yelpResults[i].location.display_address[0]} ${yelpResults[i].location.display_address[1]}`);
      Picture.prepend(`<img src=${yelpResults[i].image_url} />`);
      button.text('Click for approximate travel time')
      yelpTable.append(tr);
      tr.append(Picture);
      tr.append(Name);
      tr.append(Address);
      tr.append(button)
    }



    
    $(".button").click(function( event )  {
      
      var item_num = $(event.target).attr('id')
      
      // Location of destination from YELP
      var Ocoordinates = `${yelpResults[item_num].coordinates.latitude},${yelpResults[item_num].coordinates.longitude}`;
      
      console.log(Ocoordinates, userCord)
      // Google Maps - Direction Matrix API
      var mapURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${Ocoordinates}&destinations=${userCord}&departure_time=now&key=AIzaSyBqzdfcQm6Qg655NWXOiRgLVsdk8yP5Qxg`;
      
      // Fetching Google Maps API
      fetch(mapURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        var item = $(event.target).text(data.rows[0].elements[0].duration_in_traffic.text);
  
        button.text(item)
        });
      
      });
  });
          

}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(filterResults)
  if (filterResults.join() !==[]) {
    filterResults = []
    yelpData.remove();
  }
console.log(filterResults)

  
  for (i = 0; i < filter.length; i++) {
    if (filter[i].checked) {
      filterResults.push(filter[i].value);
    }
  }

  getData();

  console.log(zipcode.value);
  console.log(filterResults.join());
  console.log(filterResults);
});



