var URL = "https://api.yelp.com/v3/businesses/search";

fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
