require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const express = require("express");

// Initializations and env variables
const router = express.Router();
const projectID = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;
const keyFilename = process.env.KEYFILENAME;
const storage = new Storage({ projectID, keyFilename });

// async function uploadFile(bucketN,file,fileOutputName) {
//     try{
//         const bucket = storage.bucket(bucketN);
//         const ret = await bucket.upload(file, {
//             destination: fileOutputName
//         });
//         return ret;
//     }catch(error){
//         console.error(error);
//     }
// }

async function uploadFile() {
  const options = {
    destination: "destFileName.txt",
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    // preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
  };
  const filePath = "./TESTE.txt";
  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}
uploadFile().catch(console.error);

// (async ()=>{
//     const ret = await uploadFile(bucketName,'TESTE.TXT', 'cowoh.txt');
//     console.log(ret);
// })();

router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
