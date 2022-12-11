import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { Members } from '../../businessLogic/members'
import { getSocietyId } from '../utils'
import { DataAccess } from '../../dataLayer/dataAccess'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const memberId = event.pathParameters.memberId
    const society = getSocietyId(event)
    
    return {statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }, body: await new Members(new DataAccess()).createAttachmentPresignedUrl(society, memberId)}
  }
)

handler.use(
    cors({
      credentials: true,
      origin: '*'
    })
)
