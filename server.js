'use strict';

//////////libraries//////////////
require('dotenv').config();
const express = require('express'); // this is a server
const app = express();  //this to use express
//const PORT = process.env.PORT || 3000;


//////////local files///////////////
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');

///////////routes////////////
app.get('/', renderHome);
app.get('/data', renderData);
app.get('/bad', (req, res, next) => {
  next('nope not right!');
})
app.use('*', notFound);
app.use(errorHandler); //when error is thrown use this function 


/////////callback functions/////////////////////
function renderHome(req, res) {
  res.status(200).send('Hello World');
}

function renderData(req, res, next) {
  const outputObj = {
    10: "even",
    5: "odd",
    "time": new Date()
  }
  res.status(200).json(outputObj);
}



///////////turning on server///////////////////

// app.listen(PORT, () => console.log(`server up on ${PORT}`));

function start(PORT) {
  app.listen(PORT, () => console.log(`server up on ${PORT}`));
}

module.exports = {
  app: app,
  start: start
}