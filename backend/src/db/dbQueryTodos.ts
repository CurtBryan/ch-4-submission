import {DynamoDB} from "aws-sdk"

export const dbQueryTodos = async(userId: string) => {
    const dynaConnection = new DynamoDB.DocumentClient()
    
    const dynaConfig = {
        TableName: 'todos-test',
        IndexName: 'byUserId',
        KeyConditionExpression: `#userId = :id`,
        ExpressionAttributeNames: {
          '#userId': 'userId'
        },
        ExpressionAttributeValues: {
          ':id': userId
        }
      }
      const { Items } = await dynaConnection.query(dynaConfig).promise()
      
      return Items
}