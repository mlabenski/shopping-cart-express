var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message);
        throw err
    }
    else {
        console.log('connected to the database')
        db.run(`CREATE TABLE product (
            productID INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            descShort text,
            descLong text,
            visible INTEGER,
            stock INTEGER,
            price INTEGER,
            categories text,
            image text,
            featuredProduct INTEGER,
            storeID INTEGER
            )`,
            (err) =>{
                if(err){
                    //table already created
                }
                else {
                    var insert ='INSERT INTO product (name, descShort, descLong, visible, stock, price, categories, image, featuredProduct,storeID) VALUES (?,?,?,?,?,?,?,?,?,?)'
                    db.run(insert,["PICKLED RICK", "short description of a long dood", "longer because more girth to add to ricks name", 1,1,3999,"nft",'https://google.com.jpg', 1,1])
                    db.run(insert,["BORED APE", "short description of a bored ape", "the longer u wait the less gains u make", 1,1,1999,"nft",'https://google.com.jpg', 1,1])
                }
            });
    }
});

module.exports = db