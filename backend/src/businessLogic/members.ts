import { CreateMemberRequest } from '../requests/CreateMemberRequest'
import * as uuid from 'uuid'
import { UpdateMemberRequest } from "../requests/UpdateMemberRequest"
import { createLogger } from '../utils/logger'
import {getAttachmentUrl} from '../dataLayer/bucketAccess'
import { MemberItem} from '../models/MemberItem'
import { MemberUpdate } from '../models/MemberUpdate'
import { MemberDeletion } from '../models/MemberDeletion'
import { DataAccess } from '../dataLayer/dataAccess'


export class Members {
    logger: any
    dataAccess: DataAccess
    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
        this.logger = createLogger('todos')
    }    

async getMembersForSociety(society: string): Promise<string> {
    this.logger.info('getMembersForSociety: ' + society)
    
    const items = await this.dataAccess.getMembersForSocietyDao(society)

    const result = '{ "items": ' + JSON.stringify(items) + '}'

    return result
}

async getMember(society: string, memberId: string): Promise<string> {
    this.logger.info('getMember: ' + society)
    
    const item = await this.dataAccess.getMemberDao(society, memberId)

    const result = '{ "item": ' + JSON.stringify(item) + '}'

    return result
}


async createMember(societyId: string, newMember: CreateMemberRequest): Promise<string> {

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

    await this.dataAccess.createMemberDao(item)

    
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


async updateMember(society: string, memberId: string, updatedMember: UpdateMemberRequest): Promise<string> {

    const gender = updatedMember.gender
    const firstName = updatedMember.firstName
    const lastName = updatedMember.lastName
    const birthday = updatedMember.birthday
    const memberSince = updatedMember.memberSince
    const lastUpdatedAt = new Date().toISOString()


    //if not mandatory field is not set, store "" in the database
    let description = updatedMember.description
    let postCode = updatedMember.postCode
    let city = updatedMember.city
    let street = updatedMember.street
    let phoneNumber = updatedMember.phoneNumber
    let handyNumber = updatedMember.handyNumber
    let email = updatedMember.email
    let referenceId = updatedMember.referenceId

    if(!description){
        description = ""
    }

    if(!postCode){
        postCode = ""
    }

    if(!city){
        city = ""
    }

    if(!street){
        street = ""
    }

    if(!phoneNumber){
        phoneNumber = ""
    }

    if(!handyNumber){
        handyNumber = ""
    }

    if(!email){
        email = ""
    }

    if(!referenceId){
        referenceId = ""
    }




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
        referenceId,
        lastUpdatedAt
    }

    await this.dataAccess.updateMemberDao(society, memberId, updateMemberItem)

    return ""
}

async deleteMember(society: string, memberId: string): Promise<string> {
    const active = false
    const inactiveTimestamp = new Date().toISOString()

    const deletedMemberItem : MemberDeletion = {
        active, 
        inactiveTimestamp
    }
    await this.dataAccess.deleteMemberDao(society, memberId, deletedMemberItem)
    
    return ""
}


async createAttachmentPresignedUrl(society: string, memberId: string): Promise<string> {

    var timeout = parseInt(process.env.SIGNED_URL_EXPIRATION)
    this.logger.info("Timeout: " + timeout.toString())

    const attachmentUrl = await getAttachmentUrl(memberId, timeout)
    

    this.logger.info(attachmentUrl)

    await this.dataAccess.createAttachmentPresignedUrlDao(society, memberId)

    const result = '{ "uploadUrl": ' + JSON.stringify(attachmentUrl) + '}'
    
    return result
}
}
  