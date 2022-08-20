// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  	
  	let _date,
  		date_string = req.params.date;
  	if(date_string===undefined)
  		_date = new Date();
  	else
  		if(date_string.indexOf('-')===-1){
        date_string = parseInt(date_string);
        _date = new Date(date_string);
      }
  			
  		else
  			_date = new Date(Date.UTC(...date_string.split('-').map((v,i)=>parseInt(v)+(i==1?-1:0))));
  	
  	if(_date.toString() === "Invalid Date")
  		return res.json({error: "Invalid Date"});
  	return res.json({unix: _date.getTime(), utc:_date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(/*process.env.PORT*/3170, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
