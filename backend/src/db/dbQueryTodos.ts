import { DynamoDB } from 'aws-sdk'

export const dbQueryTodos = async (userId: string) => {
  const dynaConnection = new DynamoDB.DocumentClient()

  const environment = process.env.DEPLOYMENT_STAGE

  const dynaConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
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

  const editedItemsArray = Items.map((item) => {
    return {
      todoId: item.todoId,
      createdAt: item.createdAt,
      name: item.todoName,
      dueDate: item.dueDate,
      done: item.done,
      attachmentUrl: item.attachmentUrl
    }
  })

  return editedItemsArray
}
