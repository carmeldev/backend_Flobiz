var today = new Date();
var mysql = require('mysql');

var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy= today.getFullYear();
if(dd < 10){ dd='0'+dd;}
if(mm < 10){ mm='0'+mm;}
 var date = yyyy+'-'+mm+'-'+dd;

 var pool = mysql.createPool({
            host: 'remotemysql.com',
            user: 'VrQiPx8q5q',
            password: 'lXDbc7jpaG',
            port: 3306,
            database: 'VrQiPx8q5q',
            connectionLimit : 10,              
            multipleStatements : true     
  });


exports.adduser = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(date);
    pool.getConnection(function(err,connection){
        var data = {
            firstName    : input.firstName,
            lastName : input.lastName,
            email   : input.email,      
            gender   : input.gender,
            age : input.age, 
            bio : input.bio,
            password : input.password,           
            createdAt : date
        };
        if(!err) 
            console.log("Add User");
            var query = connection.query("INSERT INTO users set ? ",data,function(err,rows)
            {
                if(err){
                    console.log("Error Selecting : %s ",err );
                }           
                res.send(rows);
           });
    });
}

exports.addpost = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(date);
    pool.getConnection(function(err,connection){
        var data = {
            title    : input.title,
            description : input.description,
            imageUrl   : input.imageUrl,               
            author : input.author,              
            createdAt : date
        };
        if(!err) 
            console.log("Add post");
            var query = connection.query("INSERT INTO posts set ? ",data,function(err,rows)
            {
                if(err){
                    console.log("Error Selecting : %s ",err );
                }           
                res.send(rows);
           });
    });
}

exports.addComment = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    pool.getConnection(function(err,connection){
        var data = {
            comment    : input.comment,
            commentBy : input.commentBy,
            postId : input.postId,
            createdAt: date
        };
        if(!err) 
            console.log("Add post");
            var query = connection.query("INSERT INTO comments set ? ",data,function(err,rows)
            {
                if(err){
                    console.log("Error Selecting : %s ",err );
                }           
                res.send(rows);
           });
    });
}

exports.signin = function(req, res){

    pool.getConnection(function(err,connection){
        if(!err)
            var userName = req.body.userName;
            var password = req.body.password
           var query = connection.query('SELECT * FROM users WHERE email = ? and password = ? ',[userName,password]  ,function(err,rows)
            {
                if(err){
                    console.log("Error Selecting : %s ",err );
                }           
                res.json(rows);
           });
        
    });
}

exports.getPosts = function(req, res){
    pool.getConnection(function(err,connection){
        if(!err) 
            var query = connection.query('SELECT * FROM posts ORDER BY likes DESC LIMIT 10 ',function(err,rows)
            {
                if(err){
                    console.log("Error Selecting : %s ",err );
                }           
                res.json(rows);
           });
    });
}

exports.getSinglePost = function(req, res){
    var id = req.params.id;
    pool.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM posts WHERE id = ?',[id],function(err,rows)
       {
           
           if(err)
               console.log("Error Selecting : %s ",err );
           
           res.json(rows);
        });
   }); 
};

exports.getProfile = function(req, res){
    var id = req.params.id;
    pool.getConnection(function(err,connection){
       connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
       {
           
           if(err)
               console.log("Error Selecting : %s ",err );
           
           res.json(rows);
        });
   }); 
};

exports.getCommnets = function(req, res){
    var id = req.params.id;
    pool.getConnection(function(err,connection){
       connection.query('SELECT * FROM comments WHERE postId = ?',[id],function(err,rows)
       {
           
           if(err)
               console.log("Error Selecting : %s ",err );
           
           res.json(rows);
        });
   }); 
};

exports.editUser = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    pool.getConnection(function (err, connection) {
        var data = {
            firstName    : input.firstName,
            lastName : input.lastName,
            gender   : input.gender,
            age : input.age, 
            bio : input.bio,
            updatedAt : date
        };

        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
              if (err)
              console.log("Error Updating : %s ",err );

              res.json(rows);
          });
     });
};


exports.editPost = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    pool.getConnection(function (err, connection) {
        var data = {
            title    : input.title,
            description : input.description,
            updatedAt : date
        };

        connection.query("UPDATE posts set ? WHERE id = ? ",[data,id], function(err, rows)
        {
              if (err)
              console.log("Error Updating : %s ",err );
              
              res.json(rows);
          });
     });
};

exports.deletePost = function(req,res){
          
    var id = req.params.id;
   
    pool.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM posts  WHERE id = ? ",[id], function(err, rows)
       {    
           if(err)
                console.log("Error deleting : %s ",err );
           res.json(rows); 
       });
       
    });
};

exports.addLike = function(req,res){
    var id = req.params.id;
    pool.getConnection(function (err, connection) {

        connection.query("UPDATE posts set likes = likes+1 WHERE id = ? ",[id], function(err, rows)
        {
              if (err)
              console.log("Error Updating : %s ",err );
              
              res.json(rows);
          });
     });
};