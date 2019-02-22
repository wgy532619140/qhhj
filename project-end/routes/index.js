var express = require('express');
var router = express.Router();
var mong = require('./mongodb');

var mongoClient = require('mongodb').MongoClient;
var DB_STR = "mongodb://localhost:27017/db1";
var obj = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//默认加载数据

router.post('/moren', function(req, res, next) {
    mongoClient.connect(DB_STR, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return res.json({ code: 1, msg: "error" })
        }
        var db = con.db('abc')
        var collection = db.collection("woc")
        var aa = {}
        if (req.body.val == "undefined") {
            aa = aa
        } else {
            aa.name = { $regex: req.body.val, $options: 'i' }
        }
        console.log(aa);

        collection.find(aa).toArray(function(err, result) {
            if (err) {
                return res.json({ code: 1, msg: "error" })
            }
            res.end(JSON.stringify({ code: 0, data: result.slice((req.body.page - 1) * 5, req.body.pagesize * req.body.page), pages: result.length / req.body.pagesize > 1 ? Math.ceil(result.length / req.body.pagesize) : 0 }))
        })
    })
});


//删除

router.post('/rome', function(req, res, next) {
    var pathname = req.body.id;
    mong.delete('abc', 'woc', pathname, function(result) {
        if (result) {
            res.send({ code: 0, meg: '删除成功' })
        } else {
            res.send({ code: 1, meg: '删除失败' })
        }
    })
})

//查询
router.post('/cx', function(req, res, next) {
    var pathname = req.body.id;

    mong.find('abc', 'woc', { _id: obj(pathname) }, function(result) {
        if (result) {
            res.send({ code: 0, meg: '成功', data: result })
        } else {
            res.send({ code: 1, meg: '失败' })
        }
    })
})

//搜索
router.post('/mhcx', function(req, res, next) {
    var aa = {}
    if (req.body.val == "undefined") {
        aa = aa
    } else {
        aa.name = { $regex: req.body.val, $options: 'i' }
    }
    mong.find('abc', 'woc', aa, function(result) {
        if (result) {

            res.send({ code: 0, data: result.slice((req.body.page - 1) * 5, req.body.pagesize * req.body.page), pages: result.length / req.body.pagesize > 1 ? Math.ceil(result.length / req.body.pagesize) : 0 })
        } else {
            res.send({ code: 1, meg: '失败' })
        }
    })
})

//增加和修改

router.post('/data', function(req, res, next) {
    var pathname = req.body;
    var id = pathname.id;
    var name = pathname.name;
    var age = pathname.age;
    if (!name || !age) {
        res.send({ code: 3, meg: '补全信息' })
    } else {
        if (id) {
            delete pathname.id
            mong.undate('abc', 'woc', { _id: obj(id) }, pathname, function(result) {
                if (result) {
                    res.send({ code: 0, meg: '修改成功' })
                } else {
                    res.send({ code: 1, meg: '修改失败' })
                }
            })
        } else {
            mong.find('abc', 'woc', { name: name }, function(result) {
                if (result.length > 0) {
                    res.send({ code: 3, meg: '存在' })
                } else {
                    mong.insert('abc', 'woc', pathname, function(result) {
                        if (result) {
                            res.send({ code: 0, meg: '成功' })
                        } else {
                            res.send({ code: 1, meg: '失败' })
                        }
                    })
                }
            })
        }
    }
})





module.exports = router;