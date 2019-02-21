var mongoClient = require('mongodb').MongoClient;
var DB_STR = "mongodb://localhost:27017/db1";
var obj = require('mongodb').ObjectID;

var mongodb = {
    //头
    mon: function(kuname, collname, ck) {
        mongoClient.connect(DB_STR, { useNewUrlParser: true }, function(err, con) {
            if (err) {
                return res.json({ code: 1, msg: "error" })
            }
            var db = con.db(kuname)
            var collection = db.collection(collname)

            ck && ck(con, collection)
        })
    },
    //插入
    insert: function(kuname, collname, tab, ck) {
        mongodb.mon(kuname, collname, function(con, coll) {
            coll.insertOne(tab, function(err, restul) {
                if (err) {
                    return res.json({ code: 1, msg: "error" })
                }
                ck && ck(restul)
                con.close()
            })
        })
    },
    //删除

    delete: function(kuname, collname, tab, ck) {
        mongodb.mon(kuname, collname, function(con, coll) {
            coll.deleteOne({ _id: obj(tab) }, function(err, restul) {
                if (err) {
                    return res.json({ code: 1, msg: "error" })
                }
                ck && ck(restul)
                con.close()
            })
        })
    },
    //查询
    find: function(kuname, collname, tab, ck) {
        mongodb.mon(kuname, collname, function(con, coll) {
            coll.find(tab).toArray(function(err, restul) {
                if (err) {
                    return res.json({ code: 1, msg: "error" })
                }
                ck && ck(restul)
                con.close()
            })
        })
    },

    //修改
    undate: function(kuname, collname, condition, newData, ck) {
        mongodb.mon(kuname, collname, function(con, coll) {
            coll.updateOne(condition, { $set: newData }, function(err, restul) {
                if (err) {
                    return res.json({ code: 1, msg: "error" })
                }
                ck && ck(restul)
                con.close()
            })
        })
    }

}
module.exports = mongodb;