const dynamoose = require('dynamoose');
const { AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, isProduction, DYNAMODB_ENDPOINT } = require('./config');


if (isProduction()) {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  dynamoose.aws.ddb.set(ddb);
} else {
  dynamoose.aws.ddb.local(DYNAMODB_ENDPOINT);
}
