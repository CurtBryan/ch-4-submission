import { DynamoDB } from 'aws-sdk'

export const dbDeleteTodo = async (todoId: string) => {
  const dynaConnection = new DynamoDB.DocumentClient()

  const environment = process.env.DEPLOYMENT_STAGE

  const dynaDeleteConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
    Key: {
      todoId
    }
  }
  const deletion = await dynaConnection.delete(dynaDeleteConfig).promise()

  return deletion
}
