require('dotenv').config()
// const Nexmo = require('nexmo');

// const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
// const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const TO_NUMBER = process.env.TO_NUMBER;
// const FROM_NUMBER = process.env.FROM_NUMBER;


// const nexmo = new Nexmo({
//     apiKey: NEXMO_API_KEY,
//     apiSecret: NEXMO_API_SECRET
// });


// const from = FROM_NUMBER;
// const to = TO_NUMBER;
// const text = 'Pomoyte mne jopu!'

// nexmo.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if (responseData.messages[0]['status'] === "0") {
//             console.log("Message sent successfully.");
//         } else {
//             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//         }
//     }
// });

const accSID = 'AC1a70a6debf4ccd69053a74c4d0bad700';
const authToken = '651b91b12782f806177338c3cf855532';



const client = require('twilio')(accSID, authToken);


client.messages.create({
    to: '+79167194665',
    from: '+1 858 810 6821',
    body: 'Hello!!!!11<<12<1'
})
.then(msg => console.log(msg));









