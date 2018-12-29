const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.set('view.engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year', () =>{ return new Date().getFullYear()});
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Hey yo, I can\'t append that to the log!')
        }
    });
    next();
});
/*app.use((req,res,next) =>{
    res.render('maint.hbs', {
        pageTitle: 'Under Construction!'
    });
});*/
app.use(express.static(__dirname + '/folder'));

app.get('/', (req, res) => res.send('Yo! Wadda ya want?!'));

app.get('/home', (req,res) => {
    res.render('home.hbs', {
        pageTitle: "Dynahome",
        welcome: 'Dynamic greeting page, booyah!',
        
    });
});

app.get('/handle', (req,res) => {
    res.render('handle.hbs', {
        
        pageTitle: "Handlebar Intro"
    });
});

app.get('/bad', (req,res) => res.send({error: 'Yo I can\'t do that!'}));

app.listen(port,() => console.log(`Waiting for something to do on port ${port}`))