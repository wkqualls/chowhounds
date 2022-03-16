// Yelp Client ID: wp7597Dfcw2BqYz9TuhdRg
// Yelp API Key: API Key: qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx


var yelpResults = [];
var submit = document.querySelector("#submit");
var form = document.querySelector('#formQuestions');
var filter = document.querySelectorAll(".filter");
var checkedFilters = [];
var price = "1,2,3,4";
var zipcode_form = document.querySelector("#zipcode");
var zipcode = "";


// JS for accordion functionality
var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Getting User Location

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    userCord = `${lat},${lng}`;
  }, function (err) {
    alert('NOTE: YOU HAVE DISABLED LOCATION SERVICES. LOCATION-BASED FEATURES WILL NOT WORK FOR THIS APP')
  });
}


// YELP API

var YURL =
  "https://cors-anywhere-bc.herokuapp.com/https://api.yelp.com/v3/businesses/search";
var apiKey =
  "qwj2k9eaDr3NbcCMKw0KTm_47GpkQNJ_5WvuSP4Rcm2cXnZVqW25X8HngDG9VHMMmMw09XY5gJ9LrYFY8BPtBP0dd5B3ZHIrvfKyFCM81TmKSn4m6FCV9AIkZhQoYnYx";

function getYelp() {
  var requestObj = {
    url: YURL,
    data: { term: "restaurants", location: zipcode, limit: "50", sort_by: "rating", price:price, categories: `${checkedFilters[0]}` },
    headers: { Authorization: `Bearer ${apiKey}` },
  };

  $.ajax(requestObj).done(function (response) {
    console.log(response);
    yelpData = response.businesses;
    createTable();
    getMaps();

  });
}

function createTable() {
  var tableDiv = $('<div id = deleteTable>')

console.log(checkedFilters[0])
console.log(checkedFilters.length)
  if (checkedFilters.length > 1) {
    for (k = 0; k < yelpData.length; k++) {
      for (i = 0; i < checkedFilters.length; i++) {
        for (m = 0; m < yelpData[k].categories.length; m++) {

          if (yelpData[k].categories[m].alias === checkedFilters[i+1]) {
            yelpResults.push(yelpData[k])
          }


        }
      }
    }
  } else {
    yelpResults = yelpData
  }
if(yelpResults.length===0) {
  alert('No Results')
}else{
  console.log(yelpResults)

  for (i = 0; i < yelpResults.length; i++) {
    var tr = $('<tr class="yelpData">');
    var Picture = $('<td class="picture">');
    var Name = $('<td class="name">');
    var Address = $('<td class="address">');
    var Rating = $('<td class="rating">');
    var categories = $('<td class="categories">')
    var button = $(`<td id=${i} class = "button is-small">`);
    Name.text(yelpResults[i].name);
    Address.text(`${yelpResults[i].location.display_address[0]} ${yelpResults[i].location.display_address[1]}`);
    Picture.prepend(`<img src=${yelpResults[i].image_url} />`);
    Rating.text(yelpResults[i].rating)
    button.text('Click for approximate travel time')
   
    
    $('.yelpTable').append(tableDiv)
    tableDiv.append(tr)
    tr.append(Picture);
    tr.append(Name);
    tr.append(Address);
    tr.append(Rating);
    tr.append(categories);
    tr.append(button)

    for (m = 0; m < yelpResults[i].categories.length; m++) {
      categories.append(`${yelpResults[i].categories[m].title} <br />` )
    }
  }
}
  
}

function getMaps() {
  $(".button").click(function (event) {

    var item_num = $(event.target).attr('id');
    // Location of destination from YELP
    var restaurantCoordinates = `${yelpResults[item_num].coordinates.latitude},${yelpResults[item_num].coordinates.longitude}`;

    // Google Maps - Direction Matrix API
    var mapURL = `https://cors-anywhere-bc.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${restaurantCoordinates}&destinations=${userCord}&departure_time=now&key=AIzaSyBqzdfcQm6Qg655NWXOiRgLVsdk8yP5Qxg`;

    fetch(mapURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var item = $(event.target).text(data.rows[0].elements[0].duration_in_traffic.text);

        $(`${item_num}`).text(item)
      });

  })

};

function newSearch() {

  
  if (!!document.querySelector("#deleteTable")) {
    $('#deleteTable').remove()
    checkedFilters = []
    price = "1,2,3,4"
    yelpResults=[]
    zipcode = ""
  }

}

function getFilters() {
  for (i = 0; i < filter.length; i++) {
    if (filter[i].checked) {
      checkedFilters.push(filter[i].value)
    }
  }
  
  // Get price question
  if (checkedFilters.indexOf('$') >= 0) {

    checkedFilters.splice(checkedFilters.indexOf('$'), 1)
    price = "1"
  } else if (checkedFilters.indexOf('$$') >= 0) {
    checkedFilters.splice(checkedFilters.indexOf('$$'), 1)
    price = "2"
  } else if (checkedFilters.indexOf('$$$') >= 0) {
    checkedFilters.splice(checkedFilters.indexOf('$$$'), 1)
    price = "3"
  } else if (checkedFilters.indexOf('$$$$') >= 0) {
    checkedFilters.splice(checkedFilters.indexOf('$$$$'), 1)
    price = "4"
  } else {
    price = "1,2,3,4"
  }
  console.log(checkedFilters)

  zipcode = zipcode_form.value
  form.reset()
}

submit.addEventListener("click", function (event) {
  event.preventDefault()
  
  newSearch()
  
  getFilters()
  

  console.log(checkedFilters)
  console.log(price)
  console.log(zipcode)

  getYelp()

})
