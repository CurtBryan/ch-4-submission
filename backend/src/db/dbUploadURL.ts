import { DynamoDB } from 'aws-sdk'

export const dbUploadUrl = async (todoId: string, uploadUrl: string, userId: string) => {
  const dynaConnection = new DynamoDB.DocumentClient()

  const environment = process.env.DEPLOYMENT_STAGE

  const bucketName = process.env.TODOS_BUCKET_NAME

  const dynaPutConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
    Key: {
      todoId,
      userId
    },
    UpdateExpression: 'set attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
      ':attachmentUrl': `https://${bucketName}.s3.amazonaws.com/${todoId}`
    },
    ReturnValues: 'UPDATED_NEW'
  }
  const update = await dynaConnection.update(dynaPutConfig).promise()

  return update
}