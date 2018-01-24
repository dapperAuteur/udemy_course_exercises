var express = require('express'),
    app = express(),
    port = process.env.PORT || 3030,
    bodyParser = require('body-parser'),
    cors = require('cors');

var todoRoutes = require("./routes/todos");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));
// added to resolve CORS issue
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  // headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
});

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
    console.log("CORS-enabled & APP IS RUNNING ON PORT " + port);
})
