import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getMembersForSociety as getMembersForSociety } from '../../businessLogic/members'
import { getSocietyId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const society = getSocietyId(event)

    return {statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }, body: await getMembersForSociety(society)}

})

handler.use(
  cors({
    credentials: true,
    origin: '*'
  })
)
