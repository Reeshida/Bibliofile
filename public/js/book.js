$(document).ready(function(){

    console.log("connected");

    $("#searchSubmit").on("click", function(){
        
        if ($("#titleInput").val().length > 0){
            console.log("search good reads");
            console.log("what you typed", $("#titleInput").val());
            $.ajax({
                type:"GET",
                url:"https://cors-anywhere.herokuapp.com/"+"https://www.goodreads.com/search.xml?key=npMdKLrrzaYcjRKy80bUA&q="+$("#titleInput").val()
            }).then(function(bookdata){
                console.log("bookdata", bookdata);
                var cleanData = JSON.parse(bookdata);
                console.log("bookData",cleanData);
            });
        } else if($("#isbnInput").val().length > 0){
            console.log($("#isbnInput").val());
              console.log("search isbn");
              $("#isbn").on("click", function(){
                console.log("what you typed", $("#isbnInput").val());
                $.ajax({
                    type:"GET",
                    url:"/"
                }).then(function(book){
                    $.post("/", bookdata, function(book){
                        console.log(bookdata);
                        var cleanData = JSON.parse(book);
                        console.log("book", cleanData);
                    
                    })

                });
            });
        };
//     $("#isbnBtn").on("click", function(){
//         console.log("what you typed", $("#isbnInput").val());
//        var userSearch= {value: $('')val().trim()}
//         $.POST
//     });
    
});
});
