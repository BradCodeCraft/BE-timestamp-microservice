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

app.get("/api/:date?", function (req, res) {
  if (typeof req.params.date === "undefined") {
    res.send({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    })
  }

  if (Number.isInteger(Date.parse(req.params.date)) || !isNaN(req.params.date)) {
    if (Number.isInteger(Date.parse(req.params.date))) {
      res.send({
        "unix": Date.parse(req.params.date),
        "utc": new Date(Date.parse(req.params.date)).toUTCString()
      })
    } else {
      res.send({
        "unix": Number.parseInt(req.params.date),
        "utc": new Date(Number.parseInt(req.params.date)).toUTCString()
      })
    }
  } else {
    res.send({
      "error": "Invalid Date"
    })
  };
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
