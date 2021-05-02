import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

import { dbDeleteTodo } from '../../db/dbDeleteTodo'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    const userId = getUserId(event)

    if(!todoId) throw 'please provide a todoId parameter to complete this request'

    console.info('Deleting Data...')

    await dbDeleteTodo(todoId, userId)

    console.info('Succesfully Deleted, Sending to Client...')

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
