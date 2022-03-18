var table = $(".FavoritesTable");
var FavName = localStorage.getItem("Name").split(" ,");
var FavAddress = localStorage.getItem("Address").split(" ,");
var FavPicture = localStorage.getItem("Picture").split(",");
var FavRating = localStorage.getItem("Rating").split(" ,");
console.log(FavPicture)


function startFavorites() {

    console.log(FavName)

    for (i = 0; i < FavName.length; i++) {
        var tr = $('<tr>');
        var Picture = $('<td class="picture">');
        var Name = $('<td class="name">');
        var Address = $('<td class="address">');
        var Rating = $('<td class="rating">');


      
        Picture.css('background-image', `url(' ${FavPicture[i]} ')`)
        Picture.height(300)
        Picture.width(300)
        Picture.css('background-size', 'cover')

        console.log(FavPicture[i])

        // Picture.prepend(FavPicture[i])
        Name.text(FavName[i])
        Address.text(FavAddress[i])
        Rating.text(`${FavRating[i]}/5`)

        table.append(tr)

    tr.append(Picture);
      tr.append(Name);
      tr.append(Address);
      tr.append(Rating);

    }
}

startFavorites()