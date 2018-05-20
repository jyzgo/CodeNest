const  MongoClient = require('mongodb').MongoClient
const  settings = require("./settings")

//connect database
function _connectDB(callback) {
    let url = settings.dbUrl;
    MongoClient.connect(url,function (err,db) {
        if(err)
        {
            callback(err,null);
        }

        callback(err,db)
    })
}

function insertOne(collectionName,json,callback) {
_connectDB(function (err,db) {
    db.collection(collectionName).insertOne(json,function (err,result) {
        if(err)
        {
            callback(err,null)
            db.close()
            return
        }
        callback(err,result)
        db.close()
    })
})
}

function find(collectionName,queryJson,callback) {
_connectDB(function (err,db) {
    let json = queryJson.query|| {},
        limit = Number(queryJson.limit) || 0,
        count = Number(queryJson.page) -1,
        sort = queryJson.sort || {}
        if(count <= 0)
        {
            count = 0
        }else
        {
            count = count * limit
        }

        let cursor = db.collection(collectionName).find(json).limit(limit).skip(count).sort(sort)
        cursor.toArray(function (err,result) {
            if(err)
            {
                callback(err,null)
            }
            else {
                callback(err, result)
            }
            db.close()
        })

})
}

function deleteMany(collectionName,json,callback) {
    _connectDB(function (err,db) {
        db.collection(function (err,db) {
            db.collection(collectionName).deleteMany(json,function (err,results) {
                if(err)
                {
                    callback(err,null)
                }else
                {
                    callback(err,results)
                }
                db.close()
            })
        })
    })
}

function updateMany(collectionName,jsonOld,jsonNew,callback) {
    _connectDB(function (err,db) {
        db.collection(collectionName).updateMany(
            jsonOld,{
                $set:json,
                $currentDate:{"lastModified":false}
            },
            function (err,results) {
                if(err) {
                    callback(err, null)

                }
                callback(err,results)

                db.close()
            }
        )

    })

}

exports.insertOne = insertOne;
exports.find = find;
exports.deleteMany = deleteMany;
exports.updateMany = updateMany;
