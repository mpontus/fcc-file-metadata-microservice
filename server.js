var path = require('path');
var express = require('express');
var Busboy = require('busboy');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
  var fileSize = null;
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    file.on('data', function(data) {
      fileSize += data.length;
    });
  });
  busboy.on('finish', function() {
    res.json({size: fileSize});
  });
  req.pipe(busboy);
});

var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  console.log("App listening on port " + port)
})
