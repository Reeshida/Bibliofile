$(document).ready(function(){      
    var userID = sessionStorage.userID;
    $.ajax({
        type: "GET",
        url: "/for-sale/" + userID
    }).then(function(response){
        console.log("----------------Get User books here: " + JSON.stringify(response));
        
        for (i = 0; i < response.length; i++) {
            var book = response[i];
        
        $("#forSaleContents").append("<li class='forSaleEntry' id='forSaleId" + book.id +  "'><img src='../images/icon-book-delete.png' class='forSaleDelete' title='Delete' id='deleteBook" + book.id + "'><img src='../images/icon-request-info.png' class='minPriceUpdate' title='Change Price' id='updatePriceOf" + book.Min_Price + "'><span class='underline'>" + book.Title + "</span> <span class='bold'> ✒︎ </span> " + book.Author + "<span class='bold'> ✒︎ </span>Min Price: " + book.Min_Price + "</li>");
        }
    });

});