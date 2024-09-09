const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
const apiRouter = express.Router();

const handleRequest = (req, res, action) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'data', `${fileName}.json`);
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        if (action === 'post') {
            let newData = JSON.parse(data);
            let dublicate = newData.some(item => item.code === req.body.code);
            if(!dublicate){
                if(newData.length >= 3){
                    newData.pop();
                }
                newData.unshift(req.body);
                fs.writeFile(filePath, JSON.stringify(newData), function (err) {
                    if (err) {
                        console.error(err)
                        return res.status(500).send('Error writing file');
                    }
                })                
            }
            res.send(newData);
        }
        else{
            res.send(data);
        }
    })

}

app.get('/api/:fileName', (req, res) => {
    handleRequest(req, res, 'get')
})
app.post('/api/:fileName', (req, res) => {
    handleRequest(req, res, 'post')
})


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});