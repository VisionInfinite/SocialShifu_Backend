require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const express = require('express');

// Initializations and env variables
const router = express.Router();
const projectID = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;
const keyFilename = process.env.KEYFILENAME;
const storage = new Storage({projectID, keyFilename});


async function uploadFile(bucketN,file,fileOutputName) {
    try{
        const bucket = storage.bucket(bucketN);
        const ret = await bucket.upload(file, {
            destination: fileOutputName
        });
        return ret;
    }catch(error){
        console.error(error);
    }
}
(async ()=>{
    const ret = await uploadFile(bucketName,'./TEST.TXT', 'cowo.txt');
    console.log(ret);
})();

router.get('/', (req, res) => {
    res.send("hello world");
})

module.exports = router;