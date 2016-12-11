var fs = require('fs'),
    xml2js = require('xml2js');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var parser = new xml2js.Parser();
var content;
fs.readFile(__dirname + '/xml/Votes.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result.votes.row[0].$);
        content = result;
        processFile();
        console.log('Done');
    });
});

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('votes');

    console.log("content2: " + content.votes.row.length);
    console.log("content2: " + content.votes.row[0].$);
    for(var i = 0; i< content.votes.row.length;i++ ){
        collection.insertOne(content.votes.row[i].$,function(err, result){
            console.log("Inserted  documents into the document collection2: "+result);
            callback(result);
        });
    }
}

function processFile() {
    console.log("content1: " + content);

// Connection URL
    var url = 'mongodb://localhost:27017/hackathon';
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        insertDocuments(db, function () {
            db.close();
        });

        db.close();
    });
}