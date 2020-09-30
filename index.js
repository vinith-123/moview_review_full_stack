const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cruddatabase'
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get',(req,res)=>{
    const sqlGet = "SELECT * FROM movie_reviews";
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    });
});
app.post('/api/insert',(req,res)=>{

    const sqlInsert = "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)";
    db.query(sqlInsert,[req.body.movieName,req.body.movieReview],(err, result)=>{
        console.log(result);
    });

});

app.listen('3001',()=>{
    console.log('Started listening on port 3001');
})