const request = require("request");
const db = require("../models");
var isbn = require('node-isbn');
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = function (app) {

    app.post("/new-user", function (req, res) {
        console.log("Request: " + JSON.stringify(req.body));
        db.Users.create(
            req.body
        ).then(function (data) {
            res.json(data);
        });
    });

    app.post("/returning-user", function (req, res) {
        console.log("Request: " + JSON.stringify(req.body));
        db.Users.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function (data) {
            console.log(data)
            res.json(data);
        });
    });

    app.get('/books/:isbn', function (req, res) {
        var isbnNumber = req.params.isbn;
        isbn.resolve(isbnNumber, function (err, book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                res.json(book);
            }
        });
    });

    app.post("/add-to-library", function (req, res) {
        db.Library.create({
            ISBN: req.body.ISBN,
            Title: req.body.Title,
            Author: req.body.Author,
            UserId: req.body.UserId
        }).then(function (data) {
            res.json(data);
        });
    });


    app.post("/wishlist", function (req, res) {
        db.Wishlist.create(req.body).then(function (data) {
            res.json(data);
        });

    });

    app.post("/forsale", function (req, res) {
        db.forsale.create(req.body).then(function (data) {
            res.json(data);
        });
    });

    app.get("/library/:user_id", function (req, res) {
        var userID = req.params.user_id;
        db.Library.findAll({
            where: {
                UserId: userID
            }
        }).then(function (data) {
            res.json(data);

        });
    });

    app.get("/wishlist/:user_id", function (req, res) {
        var userID = req.params.user_id;
        db.Wishlist.findAll({
            where: {
                UserId: userID
            }
        }).then(function (data) {
            res.json(data);

        });
    });

    app.get("/forsale/:user_id", function (req, res) {
        var userID = req.params.user_id;
        db.forsale.findAll({
            where: {
                UserId: userID
            }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.delete("/library-delete/:bookId", function (req, res) {
        db.Library.destroy({
            where: {
                id: req.params.bookId
            }
        }).then(function (data) {
            res.json(data);
        });

    });

    app.delete("/wishlist-delete/:bookId", function (req, res) {
        db.Wishlist.destroy({
            where: {
                id: req.params.bookId
            }
        }).then(function (data) {
            res.json(data);
        });

    });

    app.delete("/forsale-delete/:bookId", function (req, res) {
        db.forsale.destroy({
            where: {
                id: req.params.bookId
            }
        }).then(function (data) {
            res.json(data);
        });

    });

    app.put("/forSale-update/:bookId", function(req, res) {
        console.log(req.body);
        db.forsale.update({
            Min_Price: req.body.price
        }, {
            where: {
                id: req.params.bookId
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    app.put("/wishlist-update/:bookId", function(req, res) {
        console.log(req.body);
        db.Wishlist.update({
            Max_Price: req.body.price
        }, {
            where: {
                id: req.params.bookId
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    app.get("/wishlist/:isbn/:price", function (req, res) {
        db.Wishlist.findAll({
            where: {
                ISBN: req.params.isbn,
                Max_Price: {
                    [db.Sequelize.Op.gte]: req.params.price
                }
            }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.get("/forsale/:isbn/:price", function (req, res) {
        db.forsale.findAll({
            where: {
                ISBN: req.params.isbn,
                Min_Price: {
                    [db.Sequelize.Op.lte]: req.params.price
                }
            }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.get("/for-sale/isbn/:selectedBookIsbn/price/:minPrice", function(req, res) {
        var targetIsbn = req.params.selectedBookIsbn;
        console.log("TARGET ISBN: ", targetIsbn);
        var minPrice = req.params.minPrice;
        db.Users.findAll({
            include: [{
                model: db.Wishlist,
                    where: { 
                        ISBN: targetIsbn,
                        Max_Price: {
                            [Op.gte]: minPrice
                        } 
                    } 
                                     
            }]          
        }).then(function(data){
            res.json(data);
        });
    });

    app.get("/wishlist/isbn/:selectedBookIsbn/price/:maxPrice", function(req, res) {
        var targetIsbn = req.params.selectedBookIsbn;
        console.log("TARGET ISBN: ", targetIsbn);
        var maxPrice = req.params.maxPrice;
        db.Users.findAll({
            include: [{
                model: db.forsale,
                    where: { 
                        ISBN: targetIsbn,
                        Min_Price: {
                            [Op.gte]: maxPrice
                        } 
                    }
            }]
            
        }).then(function(data){
            res.json(data);
        });
            
    });

};

