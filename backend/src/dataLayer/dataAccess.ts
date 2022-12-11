import { MemberDeletion } from "../models/MemberDeletion"
import {MemberItem } from '../models/MemberItem'
import {MemberUpdate } from '../models/MemberUpdate'
import * as AWS from "aws-sdk"
import * as AWSXRay from "aws-xray-sdk"

export class DataAccess {
    tableName: string
    docClient: any
    constructor(){
        this.tableName = process.env.MEMBERS_TABLE
        const XAWS = AWSXRay.captureAWS(AWS)
        this.docClient = new XAWS.DynamoDB.DocumentClient()
    }




async getMembersForSocietyDao(society: string): Promise<string> {
const result = await this.docClient.query({
    TableName: process.env.MEMBERS_TABLE,
    KeyConditionExpression: 'societyId = :societyId',
    ExpressionAttributeValues: {
      ':societyId': society
    }
}).promise()

return result.Items

}

async getMemberDao(society: string, memberId: string): Promise<string> {
    const result = await this.docClient.query({
        TableName: process.env.MEMBERS_TABLE,
        KeyConditionExpression: 'societyId = :societyId AND memberId = :memberId',
        ExpressionAttributeValues: {
          ':societyId': society,
          ':memberId': memberId
        }
    }).promise()
    
    return result.Items
    
    }

async createMemberDao(item: MemberItem): Promise<void> {

    await this.docClient
        .put({
        TableName: this.tableName,
        Item: item
        })
        .promise()
}

async updateMemberDao(society: string, memberId: string, updatedMember: MemberUpdate): Promise<void> {

    let updateExpression='set';
    let ExpressionAttributeNames={};
    let ExpressionAttributeValues = {};
    for (const property in updatedMember) {
        updateExpression += ` #${property} = :${property} ,`;
        ExpressionAttributeNames['#'+ property] = property ;
        ExpressionAttributeValues[':'+ property]=updatedMember[property];
    }

    updateExpression = updateExpression.substring(0, updateExpression.length-1)


    this.docClient.update({
        TableName: this.tableName,
        Key: {
            "societyId": society,
            "memberId": memberId
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues,
    }).promise()

}

async deleteMemberDao(society: string, memberId: string, deletedMember: MemberDeletion): Promise<void> {

    
    //const lastUpdatedAt = new Date().toISOString()
    console.log(deletedMember)
    
    // This is only a temporary solution, because in the future a member should not be deleted. He should be set to inactive
    this.docClient.delete({
        TableName: this.tableName,
        Key: {
            "societyId": society,
            "memberId": memberId
        }
    }).promise()


    /*docClient.update({
        TableName: tableName,
        Key: {
            "societyId": society,
            "memberId": memberId
        },
        ExpressionAttributeNames: {"#N": "active"},
        UpdateExpression: "set #N = :active, inactiveTimestamp = :inactiveTimestamp, lastUpdatedAt = :lastUpdatedAt",
        ExpressionAttributeValues: {
            ':active': deletedMember.active,
            ':inactiveTimestamp': deletedMember.inactiveTimestamp,
            ':lastUpdatedAt': lastUpdatedAt
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()*/



}

async createAttachmentPresignedUrlDao(society: string, memberId: string): Promise<void> {

    const bucket = process.env.ATTACHMENT_S3_BUCKET

    this.docClient.update({
        TableName: this.tableName,
        Key: {
            "societyId": society,
            "memberId": memberId
        },
        ExpressionAttributeNames: {"#N": "attachmentUrl"},
        UpdateExpression: "set #N = :attachmentUrl",
        ExpressionAttributeValues: {
            ':attachmentUrl': 'https://' + bucket +'.s3.amazonaws.com/' + memberId
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

}
}
