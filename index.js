const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const url = 'http://www.qfxcinemas.com';
    let movies = [];
    let onCinema = [];
    let upcomingMovies = [];
    let moviesPayload = [];

    request(url, (error, response, body) => {
        if(!error) {
            /*=============== CHEERIO ================*/
            let $ = cheerio.load(body);
            $('.movie').each(function(i, elem) {
                let title = $(this).find('h4').text();
                let type  = $(this).find('.movie-type').text();
                let image = url + $(this).find('.img-b').attr("src");
                let book  = $(this).find('.ticket').attr("href");
                if(book)
                    book = url + book;
                let date  = $(this).find('.movie-date').text().replace('\n','').trim();
                movies.push( {title, image, type, book, date} );
            });
            onCinema = movies.slice(0, 6);
            upcomingMovies = movies.slice(6);
            
            let data = {
                onCinema,
                upcomingMovies
            }
            res.send(data);
        }
    });    
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server Up & Running")
});
