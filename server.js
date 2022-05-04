var express = require('express')
var app = express()
var db = require("./database.js")

var HTTP_PORT = 8000

app.listen(HTTP_PORT, () => {
    console.log("server is now running")
});

//root endpoint
app.get('/', (req, res, next) => {
    res.json({"message":"ok"})
});

app.get('/api/products', (req, res, next) => {
    var sql = "select * from product"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
})

app.get("/api/products/store/:store", (req, res, next) => {
    var sql = "select * from product where storeID = ?"
    var params = [req.params.store]
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
})

app.get("/api/products/store/:store/product/:id", (req, res, next) => {
    var sql = "select * from product where storeID = ? and productID = ?"
    var params = [req.params.store, req.params.id]
    db.get(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows 
        })
    })
})

app.use(function(req, res){
    res.status(404);
});

// im following this guide
//https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/