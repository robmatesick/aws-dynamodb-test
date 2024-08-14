import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: "AppUsage",
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    // GlobalSecondaryIndexes: [
    //   {
    //     IndexName: "UserGSI",
    //     KeySchema: [
    //       { AttributeName: "userId", KeyType: "HASH" },
    //     ],
    //     Projection: {
    //       ProjectionType: "ALL" // Include all attributes in the index
    //     }
    //   }
    // ],
    BillingMode: "PAY_PER_REQUEST"
  });

  console.log(`Sending command...`);
  const response = await client.send(command);
  console.log(`response: `, response);
  return response;
};

main();