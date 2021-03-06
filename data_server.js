var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
  var user_data={
      name: request.query.player_name
  };
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('game', {user:user_data});
});

app.get('/:user/results', function(request, response){
  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
});

app.get('/rules', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  //load users.csv
  var users_file=fs.readFileSync("data/users.csv",'utf8');
  console.log(users_file);

  //parse csv user_data
  var rows = users_file.split("\n"); //every player in a new row

  var user_data=[]; //array for user objects

  for(var i=1; i<rows.length-1; i++) { //split every row into an array of values
    var user_d=rows[i].split(',');
    var user = {} //convert the array into an object and push to array of user objects
    user["name"]=user_d[0];
    user["password"]=user_d[1];
    user["games"]=user_d[2];
    user["wins"]=user_d[3];
    user["losses"]=user_d[4];
    user["ties"]=user_d[5];

    user_data.push(user);
  }
  console.log("An array of user objects");
  console.log(user_data);

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats',{user:user_data});
});
app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});
