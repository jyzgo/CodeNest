const db = require('./db.js')

exports.test = function(req,res,next)
{
        db.find('mytest',{"query":{}},function(err,result){
                if(err){
                        return res.json({
                                "code":404,
                                "message":"Data query failed",
                                "result":[]
                        })
                }
                return res.json({
                        "code":200,
                        "message":"Data query success",
                        "result":result,
                        "total":result.length
                })
        })
}

exports.addtest = function(req,res,next)
{
        let newData = {
                "title":req.body.title,
            'content':req.body.content
        };

        db.insertOne('mytest',newData,function (err,result)
        {
                if(err){
                        return res.json({
                            "code":401,
                            "message":"test add success"
                        })
                }

        })
}

