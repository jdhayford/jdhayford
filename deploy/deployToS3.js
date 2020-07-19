const { AWS_ACCESS_ID, AWS_SECRET_KEY } = require('../config')
const S3 = require('aws-sdk/clients/s3')

const s3 = new S3({
    accessKeyId: AWS_ACCESS_ID || process.env.AWS_ACCESS_ID,
    secretAccessKey: AWS_SECRET_KEY || process.env.AWS_SECRET_KEY
})

console.log(s3)

var params = {
    Bucket: "strumpad", 
    Key: "HappyFace.jpg", 
    ServerSideEncryption: "AES256", 
    StorageClass: "STANDARD_IA"
};
s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    /*
    data = {
    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
    ServerSideEncryption: "AES256", 
    VersionId: "CG612hodqujkf8FaaNfp8U..FIhLROcp"
    }
    */
})