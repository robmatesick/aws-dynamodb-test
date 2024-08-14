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
      "PK = :userId",
    ExpressionAttributeValues: {
      ":userId": `USER#${userId}`
    },
    ConsistentRead: true,
  });

  const response = await docClient.send(command);
  // console.log(response);
  return response;
};

const queryResult = await main('rob79', getTimestampDaysAgo(7));
console.log(`queryResult: `, queryResult);

const items = queryResult?.Items;

// const totalOutputTokens = items.reduce((total, item) => total + item.outputTokens, 0);
// console.log(`totalOutputTokens: `, totalOutputTokens);

const totals = items.reduce(
  (acc, item) => {
    acc.totalInputTokens += item.inputVolume;
    acc.totalOutputTokens += item.outputVolume;
    return acc;
  }, 
  { 
    totalInputTokens: 0, 
    totalOutputTokens: 0 
  }
);

console.log(`totals: `, JSON.stringify(totals, undefined, 2));