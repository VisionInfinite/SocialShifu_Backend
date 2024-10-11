require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const express = require('express');

// Initializations and env variables
const storage = new Storage();
const router = express.Router();
const projectID = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;
const keyFileName = process.env.KEYFILENAME;

async function uploadFile(bucketN,file,fileOutputName) {
    try{
        const storage = new Storage({projectID, keyFileName});
        const bucket = storage.bucket(bucketN);
        const ret = await bucket.upload(file, {
            destination: fileOutputName
        });
        console.log(ret);
    }catch(error){
        console.err(error);
    }
}
(async ()=>{
    uploadFile(bucketName,'TEST.TXT')
})

router.get('/', (req, res) => {
    res.send("hello world");
})

module.exports = router;