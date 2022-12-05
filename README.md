Implementations for Udacity Review 5:

Authentication: A club/society will be a user who logs in

Database Table MemberTable: 
societyId (primary key, String, User that will log in), memberId(composite key, uuid that will be auto generated), 
active (boolean, true if active, false if inactive), inactiveTimestamp (string, timestamp of deactivation, not needed for event creation),
lastUpdated (string, timestamp of last update), description (string, used for informations of a member), 
gender (enum possible?), firstName(string), lastName(string), birthday (string), postCode (string, code to identify the city), 
city (string), street (string, street + number), phoneNumber (string), handyNumber (string), email (string), memberSince (string, date of membership), 
referenceId (string, payment purposes), attachmentUrl (string, S3 URL that can be attached to store a document for the user, e.g. membership document)


Create a member with following params included in the request: (societyId), (memberId), description (optional), gender (mandatory), firstName (mandatory), lastName (mandatory), 
birthday (mandatory), postCode(optional), city (optional), street (optional), phoneNumber (optional), handyNumber (optional), email (optional), 
memberSince (mandatory), referenceId (optional)
 
 
Get all active members 

Get all members

Get one member with memberId
 
Update a member (PUT, firstly all informations of a member will be loaded and added to the fields): (societyId), (memberId), description (optional), gender (mandatory), firstName (mandatory), lastName (mandatory), 
birthday (mandatory), postCode(optional), city (optional), street (optional), phoneNumber (optional), handyNumber (optional), email (optional), 
memberSince (mandatory), referenceId (optional)


CreateAttachmentUrl request



Retire a member: No real deletion, only make it invisible, inactive with a put request: SocietyId, memberId and active + inactiveTimestamp should be set


Create Postman requests to test the functionality: 

Implementation steps: First I will create the interfaces in the backend, afterwards creation of the frontend



Implementations for the future:
export birthdayList
export honorList
set name and settings for the society/club, e.g. name or year of founding, ... New Table needed
export list of all members
make statistics for one society: e.g. how many new members in one year or how many members left. 
