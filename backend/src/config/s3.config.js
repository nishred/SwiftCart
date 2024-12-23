import { S3Client} from "@aws-sdk/client-s3";
import {
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
} from "./server.config.js";

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export default s3Client;
