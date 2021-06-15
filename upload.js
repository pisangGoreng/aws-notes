require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});
const BUCKET_NAME = "test-bucket-endy-002";

const uploadFile = (fileName, bucketName) => {
  // read file from content
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: bucketName,
    Key: "cat.jpg",
    Body: fileContent,
  };

  s3.upload(params)
    .promise()
    .then((data) => {
      console.log(`File uploaded successfully. ${data.Location}`);
    })
    .catch((err) => {
      console.error(err, err.stack);
    });
};
// uploadFile("cat.jpg", BUCKET_NAME);

const downloadFile = (filePath, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key, // the name file we want download
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(filePath, data.Body);
    console.log("File downloaded successfully.");
    console.log(data);
  });
};
// downloadFile("cat.jpg", BUCKET_NAME, "cat.jpg");

const deleteFile = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key, // Name of the file we want to delete
  };

  s3.deleteObject(params)
    .promise()
    .then((data) => {
      console.log(`File deleted successfully. ${data}`);
    })
    .catch((err) => {
      console.error(err, err.stack);
    });
};
// deleteFile(BUCKET_NAME, "cat.jpg");
