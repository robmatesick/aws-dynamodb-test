import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getTimestampDaysAgo = (daysAgo) => {
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  return Date.now() - (daysAgo * millisecondsInADay);
}

export const main = async (userId, daysAgoSecs) => {
  const command = new QueryCommand({
    TableName: "AppUsage",
    KeyConditionExpression:
      "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    },
    ConsistentRead: true,
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

main('rob79', getTimestampDaysAgo(7));