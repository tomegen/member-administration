import * as AWS from "aws-sdk"
import * as AWSXRay from "aws-xray-sdk"
import { createLogger} from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })

const logger = createLogger('dataAccess')

export async function getAttachmentUrl(memberId: string, timeout: number): Promise<string> {

    logger.info("getAttachmentURL")
    const bucket = process.env.ATTACHMENT_S3_BUCKET
    const attachmentUrl = await s3.getSignedUrl('putObject', {
        Bucket: bucket,
        Key: memberId,
        Expires: timeout
    })

    return attachmentUrl
}