$(document).ready(function(){      
    var userID = sessionStorage.userID;
    $.ajax({
        type: "GET",
        url: "/wishlist/" + userID
    }).then(function(response){
        
        for (i = 0; i < response.length; i++) {
            var book = response[i];
        
        $("#wishlistContents").append("<li class='wishlistEntry' id='wishlistId" + book.id +  "'><img src='../images/icon-book-delete.png' class='wishlistDelete' title='Delete' id='deleteBook" + book.id + "'><img src='../images/icon-book-edit.png' class='wishlistEdit' title='Change Price' id='editBook" + book.id + "'><img src='../images/icon-request-info.png' class='maxPriceUpdate' title='Find Sellers' id='updatePriceOf" + book.Max_Price + "'><span class='underline'>" + book.Title + "</span> <span class='bold'> ✒︎ </span> " + book.Author + "<span class='bold'> ✒︎ </span>Max Price: " + book.Max_Price + "</li>");
        }
    });

});