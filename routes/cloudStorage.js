require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const express = require("express");

// Initializations and env variables
const router = express.Router();
const projectID = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;
const keyFilename = process.env.KEYFILENAME;
const storage = new Storage({ projectID, keyFilename });

// Uploading a file to a folder with name -> a unique ID of the user
async function uploadFile(userID) {
  const options = {
    destination: `${userID}/filename.txt`,
    // No preconditions as of now
    // preconditionOpts: { ifGenerationMatch: generrsationMatchPrecondition },
  };
  const filePath = "./TESTE.txt";
  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}
// To test run uploading a file (currently uploads a local file)
// uploadFile("spiderboy").catch(console.error);

// List all files in bucket
async function listFiles() {
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log("Files:");
  files.forEach((file) => {
    console.log(file.name);
  });
}
// To test run listing files in the bucket
// listFiles().catch(console.error);

// Creating a folder in the bucket (each user with unique folder)

router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
