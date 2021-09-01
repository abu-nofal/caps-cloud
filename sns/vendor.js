'use strict';
const faker =require('faker')
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
// connect to SNS 
const sns = new AWS.SNS();
// add a message

const topic = 'arn:aws:sns:us-east-1:014791066733:my-tpoic';
let msg={}
setInterval(()=>{
    msg= {
    title: 'order',
    customerName: faker.name.findName(),
    orderId :faker.datatype.uuid()
};
const params = {
    TopicArn: topic,
    Message: JSON.stringify(msg)
}


    sns.publish(params).promise().then(data=> {
        console.log(data)
    }).catch(err=> {
        console.log(err)
    });

},5000)

