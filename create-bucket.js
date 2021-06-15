require("dotenv").config();
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

const params = {
  Bucket: "test-bucket-endy-002", // the name bucket will be created,
  CreateBucketConfiguration: {
    LocationConstraint: "ap-southeast-1",
  },
};

// ! This will be create a new s3 bucket
s3.createBucket(params)
  .promise()
  .then((data) => {
    console.log("Bucket Created Successfully", data.Location);
  })
  .catch((err) => {
    console.error(err, err.stack);
  });
