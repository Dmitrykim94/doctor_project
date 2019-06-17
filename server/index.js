require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const Twilio = require('twilio');




const ACC_SID = process.env.ACC_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TO_NUMBER = process.env.TO_NUMBER;
const FROM_NUMBER = process.env.FROM_NUMBER;

const client = new Twilio(ACC_SID, AUTH_TOKEN);

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('/send-sms', function (req, res) {
    res.header('Content-Type', 'application/json');

    const { text } = req.query;
    console.log(text)

    client.messages.create({
        to: TO_NUMBER,
        from: FROM_NUMBER,
        body: text
    })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

app.listen(3000, () => console.log('PORT 3000!'))
