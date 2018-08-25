$(document).ready(function(){      
    var userID = sessionStorage.userID;
    $.ajax({
        type: "GET",
        url: "/library/" + userID
    }).then(function(response){
        
        for (i = 0; i < response.length; i++) {
            var book = response[i];
        
        $("#libraryContents").append("<li class='libraryEntry' id='libraryId" + book.id +  "'><img src='../images/icon-book-delete.png' class='libraryDelete' title='Delete' id='deleteBook" + book.id + "'><span class='underline'>" + book.Title + "</span> <span class='bold'> ✒︎ </span> " + book.Author + "</li>");
        }
    });

});