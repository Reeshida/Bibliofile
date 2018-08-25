var userID;
var usernameText;

$(document).ready(function(){
    var bookToSave ={};
    var isbn = {};

    console.log("connected");
    if(sessionStorage.userID) {
        $('#main').hide();
        $("#selectNextAction").show(600);
    } else {
        $("#main").show(600);
        $("#selectNextAction").hide();
    }
    $("#signUp").on("click", function() {
        event.preventDefault();

        var username = $("#createUsername").val().trim();
        var password = $("#createPassword").val().trim();
        var email = $("#createEmail").val().trim();

        var newUser = {
            username,
            password,
            email
        };

        if (email.length > 0 && username.length > 0 && password.length > 0) {
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/new-user",
                data: newUser
            }).then(function(response){
                usernameText = response.username;
                sessionStorage.userID = response.id;
                console.log(JSON.stringify(response));
                $("#insertUsername").text(", " + usernameText);
            }); 
        } else {
            alert("Please fill in all fields.");
            document.getElementById("main").style.display="block";
            document.getElementById("selectNextAction").style.display="none";
        }
    });

    $("#signIn").on("click", function() {
        event.preventDefault();

        var password = $("#enterPassword").val().trim();
        var email = $("#enterEmail").val().trim();

        var returningUser = {
            password,
            email
        };

        if (email.length > 0 && password.length > 0) {
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/returning-user",
                data: returningUser
            }).then(function(response){
                usernameText = response.username;
                sessionStorage.userID = response.id;
                $("#insertUsername").text(", " + usernameText);
            }); 
        } else {
            alert("Please fill in all fields");
            document.getElementById("main").style.display="block";
            document.getElementById("selectNextAction").style.display="none";
        }
    });

    $("#searchSubmit").on("click", function(){
        
        if($("#isbnInput").val().length == 10 || $("#isbnInput").val().length == 13){
            isbn = $("#isbnInput").val();
            console.log("search isbn: " + isbn);
            $.ajax({
                type:"GET",
                url:"http://localhost:3000/books/" + isbn
            }).then(function(response){
                $("#book-title").text("✒︎ Title: " + response.title);
                $("#book-author").text("✒︎ Author: " + response.authors[0]);
                bookToSave = response;
            });
        } else {
            alert("Please put in only a 10 or 13 digit ISBN");
            document.getElementById("selectNextAction").style.display="block";
            document.getElementById("searchResults").style.display="none";
        }
    });
   
    $("#addToLibraryButton").on("click", function() {
        event.preventDefault();
        
        var cleanBook = {            
            ISBN:parseInt(isbn),     
            Title: bookToSave.title,
            Author:bookToSave.authors[0],
            UserId: sessionStorage.userID
        };
        
        $.ajax({
            type:"POST",
            url:"http://localhost:3000/add-to-library",
            data: cleanBook
        }).then(function(response){
            document.getElementById("success").style.display="block";
            document.getElementById("searchResults").style.display="none";
        }); 
    });

    $("#addToWishlistButton").on("click", function() {

        if ($("#wishListPrice").val().length > 0) {
            event.preventDefault();
            
            var wishlistBook = {            
                ISBN: parseInt(isbn),     
                Title: bookToSave.title,
                Author:bookToSave.authors[0],
                Max_Price: parseFloat($("#wishListPrice").val()),
                UserId: sessionStorage.userID
            };
            
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/wishlist",
                data: wishlistBook
            }).then(function(response){
                document.getElementById("success").style.display="block";
                document.getElementById("searchResults").style.display="none";
            }); 
        } else {
            alert ("Please set your max price.");
        }
    });

    $("#addToForSaleButton").on("click", function() {

        if ($("#forSalePrice").val().length > 0) {
            event.preventDefault();
            
            var forSaleBook = {            
                ISBN: parseInt(isbn),     
                Title: bookToSave.title,
                Author: bookToSave.authors[0],
                Min_Price: parseFloat($("#forSalePrice").val()),
                UserId: sessionStorage.userID
            };
            
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/for-sale",
                data: forSaleBook
            }).then(function(response){
                document.getElementById("success").style.display="block";
                document.getElementById("searchResults").style.display="none";
            }); 
        } else  {
            alert ("Please set your min price.");
        }
    });
});
