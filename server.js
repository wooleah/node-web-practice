const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
//middleware let's us configure how this express app works
//express.static takes absolute path
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//use app.use to make middleware
//middleware-Serverlog
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});
//middleware-maintenance
// app.use((req, res, next) => {
//   res.render('maintenance');
// });
//middleware-static
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('yell', (text) => {
  return text.toUpperCase();
});

//handler for Http get request
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome!!',
  });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page',
      welcomeMessage: 'wow'
    });
});

app.get('/projects', (req, res) => {
  res.render('portfolio',{
    pageTitle: 'My portfolio',
    welcomeMessage: 'Thank you'
  });
});

//
// app.get('/bad', (req, res) => {
//   res.send({
//     error: 'Unable to handle request'
//   });
// });

//bind the app to the port of this machine
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
