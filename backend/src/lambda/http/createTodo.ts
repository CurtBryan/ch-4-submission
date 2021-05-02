import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import { getUserId } from '../utils'

import { dbCreateTodo } from '../../db/dbCreateTodo'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    console.log(newTodo)

    if(!newTodo.name || typeof newTodo.name !== "string") throw "Please provide valid name for the Todo Item in type String"
    if(!newTodo.dueDate || typeof newTodo.dueDate !== "string") throw "Please provide valid due date for the Todo Item in type String"

    const userId = getUserId(event)

    console.info('Creating New Item...')

    const item = await dbCreateTodo(userId, newTodo)

    console.info('Succesfully Created, Sending to Client...')

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        item
      })
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
