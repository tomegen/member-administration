import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getMember as getMember } from '../../businessLogic/members'
import { getSocietyId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const memberId = event.pathParameters.memberId
    const society = getSocietyId(event)

    return {statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }, body: await getMember(society, memberId)}

})

handler.use(
  cors({
    credentials: true,
    origin: '*'
  })
)
