const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');




router.get('/api/friends', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '../data/friends.js'));
});

router.post('/api/friends', function(req, res)  {

    fs.readFile('./app/data/friends.js', 'UTF-8', function(err, data) {
        if(err) throw err;
        //console.log(JSON.parse(data));
        const friends = JSON.parse(data);
        const user = req.body;
        const diffScoreArr = [];
        
        friends.forEach(function(val, i){
            const uScores = [];
            const fScores = [];
            const diffs = [];

            user.scores.forEach((val) => uScores.push(parseInt(val)));
            
            friends[i].scores.forEach((val) => fScores.push(parseInt(val)));

            for (let i = 0; i < uScores.length; i++) {
                const uScore = uScores[i];
                const fScore = fScores[i];
                if(uScore > fScore) {
                    diffs.push(uScore - fScore);
                }else if(uScore < fScore) {
                    diffs.push(fScore - uScore);
                }else if (uScore === fScore) {
                    diffs.push(0);
                }else{
                    return console.log('Error with data');
                }
            }
            console.log(diffs);

            const diffScore = diffs.reduce(function (total, val){
                return total += val;
            });
            diffScoreArr.push(diffScore);
        });

        
        console.log(diffScoreArr);
        let lowScore = diffScoreArr[0];
        for (let i = 0; i < diffScoreArr.length; i++) {
            if(lowScore > diffScoreArr[i]){
                lowScore = diffScoreArr[i]
            }
        }
        console.log(lowScore);
        const matches = [];
        
        for(let i = 0; i < diffScoreArr.length; i++) {
            if(lowScore === diffScoreArr[i]){
                matches.push(friends[i]);
            }
        }

        friends.push(user);
        fs.writeFile('./app/data/friends.js', JSON.stringify(friends), function (err) {
            if (err) throw err;
            console.log('friends.js was updated!');
        });

        res.status(200).json(matches);
    });
    
    
});

module.exports = router;