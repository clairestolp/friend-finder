const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function(req, res){
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/survey', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/survey.html'));
});

module.exports = router;




