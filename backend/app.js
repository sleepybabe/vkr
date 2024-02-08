const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');

app.use(cors()); 

app.get('/getTest', (req, res) => {
    const id = req.query.id;
    const path = `${__dirname}/tests/html/lab${id}.js`;

    res.sendFile(path, (error) => {
        if (error) {
            console.error(error);
        }
    });
});

const port = 3000;
app.listen(port);


