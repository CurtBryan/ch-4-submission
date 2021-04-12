import { DynamoDB } from 'aws-sdk'

export const dbUpdateTodo = async (todoId: string, body: any) => {
  const dynaConnection = new DynamoDB.DocumentClient()

  const environment = process.env.DEPLOYMENT_STAGE

  const dynaGetConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
    Key: {
      todoId
    }
  }

  const { Item } = await dynaConnection.get(dynaGetConfig).promise()

  if (!Item) return `Invalid Id Given`

  const dynaPutConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
    Key: {
      todoId
    },
    UpdateExpression: 'set todoName = :todoName, dueDate=:dueDate, done=:done',
    ExpressionAttributeValues: {
      ':todoName': body.name || Item.todoNameame,
      ':dueDate': body.dueDate || Item.dueDate,
      ':done': body.done || Item.done
    },
    ReturnValues: 'UPDATED_NEW'
  }
  const update = await dynaConnection.update(dynaPutConfig).promise()

  return update
}
