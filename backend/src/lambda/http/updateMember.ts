import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { updateMember } from '../../businessLogic/members'
import { UpdateMemberRequest } from '../../requests/UpdateMemberRequest'
import { getSocietyId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const memberId = event.pathParameters.memberId
    const updatedMember: UpdateMemberRequest = JSON.parse(event.body)
    const society = getSocietyId(event)

    return {statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }, body: await updateMember(society, memberId, updatedMember)}
  }
)

handler.use(
    cors({
      credentials: true,
      origin: '*'
    })
  )
