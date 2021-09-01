'use strict';

const AWS = require('aws-sdk');
const {Consumer} = require('sqs-consumer');
console.log("inside index!!!")
AWS.config.update({region: 'us-east-1'});
// connect to SNS 


const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/014791066733/my-queu',
    handleMessage: async(msg)=> {
        console.log("msg :", msg.Body)
        console.log(typeof msg.Body)
        let parsedBody = await JSON.parse(msg.Body); // msg.Body is text
        const mymsg = await JSON.parse(parsedBody.Message);
        setTimeout(()=>{

            console.log("mymsg >>>> ", mymsg)
        },4000)
    }
});

app.on('error', err=> {
    console.error(err)
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.start()