import { CreateMemberRequest } from '../requests/CreateMemberRequest'
import * as uuid from 'uuid'
import { UpdateMemberRequest } from "../requests/UpdateMemberRequest"
import { createLogger } from '../utils/logger'
import { getMembersForSocietyDao, createMemberDao, updateMemberDao, deleteMemberDao, createAttachmentPresignedUrlDao, getMemberDao } from '../dataLayer/dataAccess'
import {getAttachmentUrl} from '../dataLayer/bucketAccess'
import { MemberItem} from '../models/MemberItem'
import { MemberUpdate } from '../models/MemberUpdate'
import { MemberDeletion } from '../models/MemberDeletion'


const logger = createLogger('todos')


export async function getMembersForSociety(society: string): Promise<string> {
    logger.info('getMembersForSociety: ' + society)
    
    const items = await getMembersForSocietyDao(society)

    const result = '{ "items": ' + JSON.stringify(items) + '}'

    return result
}

export async function getMember(society: string, memberId: string): Promise<string> {
    logger.info('getMember: ' + society)
    
    const item = await getMemberDao(society, memberId)

    const result = '{ "item": ' + JSON.stringify(item) + '}'

    return result
}


export async function createMember(societyId: string, newMember: CreateMemberRequest): Promise<string> {

    const memberId = uuid.v4()
    const active = true
    const inactiveTimestamp = null
    const lastUpdatedAt = new Date().toISOString()
    const attachmentUrl = ""
    const description = newMember.description
    const gender = newMember.gender
    const firstName = newMember.firstName
    const lastName = newMember.lastName
    const birthday = newMember.birthday
    const postCode = newMember.postCode
    const city = newMember.city
    const street = newMember.street
    const phoneNumber = newMember.phoneNumber
    const handyNumber = newMember.handyNumber
    const email = newMember.email
    const memberSince = newMember.memberSince
    const referenceId = newMember.referenceId


    const item : MemberItem = {
        societyId,
        memberId,
        active,
        inactiveTimestamp, 
        lastUpdatedAt, 
        attachmentUrl,
        description, 
        gender,
        firstName, 
        lastName, 
        birthday, 
        postCode, 
        city,
        street, 
        phoneNumber,
        handyNumber, 
        email, 
        memberSince, 
        referenceId
    }

    await createMemberDao(item)

    
    const res = {
        memberId,
        lastUpdatedAt, 
        attachmentUrl,
        description, 
        gender,
        firstName, 
        lastName, 
        birthday, 
        postCode, 
        city,
        street, 
        phoneNumber,
        handyNumber, 
        email, 
        memberSince, 
        referenceId

    }

    const result = '{ "item": ' + JSON.stringify(res) + '}'

    return result  
}


export async function updateMember(society: string, memberId: string, updatedMember: UpdateMemberRequest): Promise<string> {

    const description = updatedMember.description
    const gender = updatedMember.gender
    const firstName = updatedMember.firstName
    const lastName = updatedMember.lastName
    const birthday = updatedMember.birthday
    const postCode = updatedMember.postCode
    const city = updatedMember.city
    const street = updatedMember.street
    const phoneNumber = updatedMember.phoneNumber
    const handyNumber = updatedMember.handyNumber
    const email = updatedMember.email
    const memberSince = updatedMember.memberSince
    const referenceId = updatedMember.referenceId

    const updateMemberItem : MemberUpdate = {
        description, 
        gender,
        firstName, 
        lastName, 
        birthday, 
        postCode, 
        city,
        street, 
        phoneNumber,
        handyNumber, 
        email, 
        memberSince, 
        referenceId
    }

    await updateMemberDao(society, memberId, updateMemberItem)

    return ""
}

export async function deleteMember(society: string, memberId: string): Promise<string> {
    const active = false
    const inactiveTimestamp = new Date().toISOString()

    const deletedMemberItem : MemberDeletion = {
        active, 
        inactiveTimestamp
    }
    await deleteMemberDao(society, memberId, deletedMemberItem)
    
    return ""
}


export async function createAttachmentPresignedUrl(society: string, memberId: string): Promise<string> {

    var timeout = parseInt(process.env.SIGNED_URL_EXPIRATION)
    logger.info("Timeout: " + timeout.toString())

    const attachmentUrl = await getAttachmentUrl(memberId, timeout)
    

    logger.info(attachmentUrl)

    await createAttachmentPresignedUrlDao(society, memberId)

    const result = '{ "uploadUrl": ' + JSON.stringify(attachmentUrl) + '}'
    
    return result
}
  