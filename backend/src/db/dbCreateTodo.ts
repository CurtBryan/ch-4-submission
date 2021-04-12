import { DynamoDB } from 'aws-sdk'
import { getTime } from '../utils/timestamp'
import { genGUID } from '../utils/uuid'

export const dbCreateTodo = async (userId: string, body: any) => {

  const dynaConnection = new DynamoDB.DocumentClient()

  const environment = process.env.DEPLOYMENT_STAGE

  const dynaPutConfig = {
    TableName: `todos-table-${environment}`,
    // TableName: 'todos-test',
    Item: {
      userId,
      todoId: genGUID(),
      createdAt: getTime(),
      todoName: body.name,
      dueDate: body.dueDate,
      done: body.done,
      attachmentUrl: body.attachmentUrl
    }
  }
  await dynaConnection.put(dynaPutConfig).promise()

  return {
    todoId: dynaPutConfig.Item.todoId,
    createdAt: dynaPutConfig.Item.createdAt,
    name: dynaPutConfig.Item.todoName,
    dueDate: dynaPutConfig.Item.dueDate,
    done: dynaPutConfig.Item.done,
    attachmentUrl: dynaPutConfig.Item.attachmentUrl
  }
}
