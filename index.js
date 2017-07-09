const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const url = 'http://www.qfxcinemas.com/';
    let movies = [];
    let upcomingMovies = [];

    request(url, (error, response, body) => {
        if(!error) {
            /*=============== CHEERIO ================*/
            let $ = cheerio.load(body);
            $(".movie").each(function(i, elem) {
                let movie = $(this).find('h4').text()
                let image = $(this).find('.img-b').attr("src")
                image = url + image;
                movies.push({title: movie, image});
            });
            upcomingMovies = movies.slice(6)
            movies = movies.slice(0, 6);
            let data = {
                movies,
                upcomingMovies
            }
            res.send(data);
        }
    });    
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server Up & Running")
});
