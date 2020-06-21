const express = require('express');
const router = express.Router();
const Stocks = require('../models/stocks');

// Redirect to index route
router.get('/', function(req, res){
	res.redirect("/stocks");
})

// Index route
router.get('/stocks', function(req, res) {
	let perPage = 32;
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		// Get all stocks from DB
		Stocks.find({Ticker: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allStocks) {
			Stocks.countDocuments({Ticker: regex}).exec(function (err, count) {
			if (err) {
				req.flash("error", "NO STOCK FOUND");
				res.redirect("/stocks");
			} else {
				  if(allStocks.length < 1) {
					  req.flash("error", "No Stocks match that query, please try again.");
					  res.redirect("/stocks");
				  }
				res.render("index", {
					Stocks: allStocks,
				 current: pageNumber,
					pages: Math.ceil(count/perPage),
					search: req.query.search
				});
			}
			});
		});
	} else {
		// Get all Stocks from DB
		Stocks.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allStocks){
			Stocks.countDocuments().exec(function(err, count) {
			if(err) {
				req.flash("error", "NO STOCK FOUND");
				res.redirect("/stocks");
			} else {
				res.render("index", {
					Stocks: allStocks,
					current: pageNumber,
					pages: Math.ceil(count / perPage),
					search: false
				});
			}
			});
		});
	}
});

// New Route
router.get("/stocks/new", function(req, res){
	res.render("new");
});

// Create Route
router.post("/stocks", function(req, res){
	// Create stock
	Stocks.create(req.body.stock, function(err, newStock){
			if(err){
				req.flash("error", "NO STOCK FOUND");
				res.redirect("new");
			} else {
				// Then, redirect to index
				req.flash("success", "STOCK SUCCESSFULLY ADDED")
				res.redirect("/stocks");
			}
	});
});

// Show Route
router.get("/stocks/:id", function(req, res){
		Stocks.findById(req.params.id, function(err, foundStock){
				if(err){
					req.flash("error", "STOCK DOES NOT EXIST");
					res.redirect('/stocks');
				} else {
					res.render("show", {stock: foundStock});
				}
		})
});

// Edit Route
router.get("/stocks/:id/edit", function(req, res){
	Stocks.findById(req.params.id, function(err, foundStock) {
		if(err) {
			req.flash("error", "STOCK NOT FOUND");
			res.redirect("/blogs");
		} else {
			res.render("edit", {stock: foundStock});
		}
});
});

// Update Route
router.put("/stocks/:id", function(req, res){
	Stocks.findByIdAndUpdate(req.params.id, req.body.stock, function(err, updatedStock){
		if(err) {
			req.flash("error", "STOCK NOT FOUND");
			res.redirect("/stocks");
		} else {
			req.flash("error", "STOCK UPDATED");
			res.redirect("/stocks/" + req.params.id)
		}
	})
});

// Destroy Route
router.delete("/stocks/:id", function(req,res){
	//Destroy stock
	Stocks.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", "STOCK NOT FOUND");
			res.redirect("/stocks");
		} else {
			req.flash("success", "STOCK SUCCESSFULLY DELETED");
			res.redirect("/stocks");
		}
	})
});

// Search Function
function escapeRegex(text) {
	return text.replace(/[=[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
