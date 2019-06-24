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



app.post('/send-sms', function (req, res) {
    res.header('Content-Type', 'application/json');

    client.messages.create({
        to: '+79167194665',
        from: FROM_NUMBER,
        body: `
        Адрес: ${req.body.text.address}
        Телефон: ${req.body.text.tel}
        Перейдите по ссылке, чтобы подтвердить вызов: link/#/${req.body.text.id}
        `
    })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

app.listen(4000, () => console.log('PORT 4000!'))
