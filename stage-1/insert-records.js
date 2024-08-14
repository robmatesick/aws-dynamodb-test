import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getRandomInt = (min, max) => {
  min = Math.ceil(min); // Ensure the minimum is inclusive
  max = Math.floor(max); // Ensure the maximum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const insertRecord = async (userId) => {
  const command = new PutCommand({
    TableName: "AppUsage",
    Item: {
      id: uuidv4(),
      created: Date.now(),
      userId: userId,
      inputTokens: getRandomInt(20, 1000),
      outputTokens: getRandomInt(50, 700),
      cost: 0
    },
  });

  console.log(`Sending command...`);
  const response = await docClient.send(command);
  console.log(`response: `, response);
  return response;
};

insertRecord('rob79');
insertRecord('rob79');
insertRecord('rob79');
insertRecord('tim12');
insertRecord('tim12');
insertRecord('rob79');
insertRecord('kaleigh85');