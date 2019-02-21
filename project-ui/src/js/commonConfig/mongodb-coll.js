var mongoClient = require('mongodb').MongoClient;
var DB_STR = "mongodb://localhost:27017/db1";

var mongodb = {
    mon: function(a, b, ck) {
        mongoClient.connect(DB_STR, { useNewUrlParser: true }, function(err, con) {
            if (err) {
                return res.json({ code: 1, msg: "error" })
            }
            var db = con.db(a)
            var collection = db.collection(b)

            ck && ck(null, con, collection)
                // collection.find().toArray(function(err, result) {
                //     if (err) {
                //         return res.json({ code: 1, msg: "error" })
                //     }
                //     res.end(JSON.stringify({ code: 0, data: result }))
                // })
        })
    },
    insert: function(a, b, tab, ck) {
        mongodb.mon(a, b, function(err, tab, ck) {

        })
    }
}