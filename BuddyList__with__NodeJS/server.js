const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use('/', express.static('./public'));
// app.use('/', express.static(path.join(__dirname, 'public')));



app.get('/buddylist', (req, res) => {
    fs.readFile('./data/buddy-list.json', 'utf-8', (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
        else
            res.status(200).json(data);
    })
});

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});