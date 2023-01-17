// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  if (req.params.date === undefined || req.params.date === '') {
    console.log("Empty or null");
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    });
  } else {
    const val = Date.parse(req.params.date);
    if (!Number.isNaN(val)) {
      console.log("Normal");
      res.json({
        unix: Math.floor(new Date(req.params.date.trim()).getTime()),
        utc: new Date(req.params.date.trim()).toUTCString()
      });
    } else {
      if (req.params.date.length > 12) {
        console.log("Parse");
        var d = new Date(0);
        d.setUTCMilliseconds(req.params.date);
        res.json({
          unix: req.params.date.trim(),
          utc: d.toUTCString()//To fix
        });
      } else {
        console.log("Error");
        res.json({ error: "Invalid Date" });
      }
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
