import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import { dbUpdateTodo } from '../../db/dbUpdateTodo'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const userId = getUserId(event)
    
    if(!updatedTodo.name || typeof updatedTodo.name !== "string") throw "Please provide valid name for the Todo Item in type String"
    if(!updatedTodo.dueDate || typeof updatedTodo.dueDate !== "string") throw "Please provide valid due date for the Todo Item in type String"

    console.info('Updating Data...')

    await dbUpdateTodo(todoId, updatedTodo, userId)

    console.info('Data Retrieved, Sending to Client...')

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({})
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: err
      })
    }
  }
}
