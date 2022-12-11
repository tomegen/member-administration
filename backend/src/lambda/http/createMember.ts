import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateMemberRequest } from '../../requests/CreateMemberRequest'
import { getSocietyId } from '../utils';
import { Members } from '../../businessLogic/members'
import { DataAccess } from '../../dataLayer/dataAccess'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newMember: CreateMemberRequest = JSON.parse(event.body)
    const society = getSocietyId(event)

    return {statusCode: 201, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },body: await new Members(new DataAccess()).createMember(society, newMember)}

  }

)
handler.use(
  cors({
    credentials: true,
    origin: '*'
  })
)
