const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('app/public'));



const htmlRoutes = require('./app/routing/htmlRoutes.js');
app.use(htmlRoutes);

const apiRoutes =  require('./app/routing/apiRoutes');
app.use(apiRoutes);



const PORT = process.env.PORT || 8080;


app.listen(PORT, function (err) {
    if (err) throw err;
    console.log('App listening on port: ' + PORT);
});