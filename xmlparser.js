var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/xml/Posts.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result.posts.row[0]);
        console.log('Done');
    });
});