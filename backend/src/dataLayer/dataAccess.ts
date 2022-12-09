import * as AWS from "aws-sdk"
import * as AWSXRay from "aws-xray-sdk"
import { MemberDeletion } from "../models/MemberDeletion"
import {MemberItem } from '../models/MemberItem'
import {MemberUpdate } from '../models/MemberUpdate'


const tableName = process.env.MEMBERS_TABLE
const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()


export async function getMembersForSocietyDao(society: string): Promise<string> {
const result = await docClient.query({
    TableName: process.env.MEMBERS_TABLE,
    KeyConditionExpression: 'societyId = :societyId',
    ExpressionAttributeValues: {
      ':societyId': society
    }
}).promise()

return result.Items

}

export async function getMemberDao(society: string, memberId: string): Promise<string> {
    const result = await docClient.query({
        TableName: process.env.MEMBERS_TABLE,
        KeyConditionExpression: 'societyId = :societyId AND memberId = :memberId',
        ExpressionAttributeValues: {
          ':societyId': society,
          ':memberId': memberId
        }
    }).promise()
    
    return result.Items
    
    }

export async function createMemberDao(item: MemberItem): Promise<void> {

    await docClient
        .put({
        TableName: tableName,
        Item: item
        })
        .promise()
}

export async function updateMemberDao(society: string, memberId: string, updatedMember: MemberUpdate): Promise<void> {

    const lastUpdatedAt = new Date().toISOString()

    docClient.update({
        TableName: tableName,
        Key: {
            "societyId": society,
            "memberId": memberId
        },
        ExpressionAttributeNames: {"#N": "lastUpdatedAt"},
        UpdateExpression: "set #N = :lastUpdatedAt, description = :description, gender = :gender, firstName = :firstName, lastName = :lastName,"
        + " birthday = :birthday, postCode = :postCode, city = :city, street = :street, phoneNumber = :phoneNumber, handyNumber = :handyNumber,"
        + " email = :email, memberSince = :memberSince, referenceId = :referenceId",
        ExpressionAttributeValues: {
            ':lastUpdatedAt': lastUpdatedAt,
            ':gender': updatedMember.gender,
            ':firstName': updatedMember.firstName,
            ':lastName': updatedMember.lastName,
            ':birthday': updatedMember.birthday,
            ':postCode': updatedMember.postCode,
            ':city': updatedMember.city,
            ':street': updatedMember.street,
            ':phoneNumber': updatedMember.phoneNumber,
            ':handyNumber': updatedMember.handyNumber,
            ':email': updatedMember.email,
            ':memberSince': updatedMember.memberSince,
            ':referenceId': updatedMember.referenceId
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

}

export async function deleteMemberDao(society: string, memberId: string, deletedMember: MemberDeletion): Promise<void> {

    
    //const lastUpdatedAt = new Date().toISOString()
    console.log(deletedMember)
    
    // This is only a temporary solution, because in the future a member should not be deleted. He should be set to inactive
    docClient.delete({
        TableName: tableName,
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

export async function createAttachmentPresignedUrlDao(society: string, memberId: string): Promise<void> {

    const bucket = process.env.ATTACHMENT_S3_BUCKET

    docClient.update({
        TableName: tableName,
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



