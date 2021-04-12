import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

import { generateUrl } from '../../s3/generateUrl'

import {dbUploadUrl} from "../../db/dbUploadURL"

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    console.info('Retrieving Presigned Url...')

    const url = generateUrl(todoId)

    await dbUploadUrl(todoId, url)

    console.info('Data Retrieved, Sending to Client...')

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl: url
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
