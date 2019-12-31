var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var connection  = require('express-myconnection'); 
var cors = require('cors');
var route = require('./controller/routes');

app.set('port', process.env.PORT || 4300);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res, next){
    res.send("hello"); 
});

app.post('/adduser',route.adduser);
app.post('/addpost',route.addpost);
app.post('/addcomment',route.addComment);
app.post('/signin',route.signin);
app.get('/getposts',route.getPosts);
app.get('/getsinglepost/:id',route.getSinglePost);
app.get('/getProfile/:id',route.getProfile);
app.get('/getcomments/:id',route.getCommnets);
app.post('/editUser/:id',route.editUser);
app.post('/editPost/:id',route.editPost);
app.post('/addLike/:id',route.addLike);
app.get('/deletePost/:id', route.deletePost);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
