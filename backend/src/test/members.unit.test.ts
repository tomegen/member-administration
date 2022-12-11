import "mocha"
import "sinon"
import { expect } from "chai"
import { CreateMemberRequest } from "../requests/CreateMemberRequest";
import { UpdateMemberRequest } from "../requests/UpdateMemberRequest";
import { Members } from "../businessLogic/members";
import { DataAccess } from "../dataLayer/dataAccess";



  describe("Members", () => {
      
      describe("Create a member", () => {

          it("response should not be null", () => {

            const sinon = require("sinon")
            const dataAccess = new DataAccess()
            sinon.stub(dataAccess, "createMemberDao").returns()
            const members = new Members(dataAccess)

            const society = "google-oauth2|107899758771884013642"
            const newMember :CreateMemberRequest = {
              description: "description", 
              gender: "m",
              firstName: "Test", 
              lastName: "Tester", 
              birthday: "02102000", 
              postCode: "32537", 
              city: "Munich",
              street: "Baker Street 4", 
              phoneNumber: "8729002",
              handyNumber: "2387032", 
              email: "test.tester@google.de", 
              memberSince: "02102004", 
              referenceId: "REF-320"
            }

            return members.createMember(society, newMember).then(result => {
              const res = result.startsWith('{ "item": ')
              expect(res).to.equal(true)
            })
        });
      });

      describe("Update a member", () => {
        it("response should not be null", () => {
          const sinon = require("sinon")
          const dataAccess = new DataAccess()
          sinon.stub(dataAccess, "updateMemberDao").returns()
          const members = new Members(dataAccess)

          const society = "google-oauth2|107899758771884013642"
          const memberId = "d101b4dd-3873-484c-bf2c-0d7788dd2f12"
          const updateMember :UpdateMemberRequest = {
            description: "description", 
            gender: "m",
            firstName: "Test", 
            lastName: "Tester", 
            birthday: "02102000", 
            postCode: "32537", 
            city: "Munich",
            street: "Baker Street 4", 
            phoneNumber: "8729002",
            handyNumber: "2387032", 
            email: "test.tester@google.de", 
            memberSince: "02102004", 
            referenceId: "REF-320"
          }

          return members.updateMember(society, memberId, updateMember).then(result => {
            expect(result).to.equal("")
          });
        });
      });

      describe("Delete a member", () => {
        it("response should not be null", () => {
          const sinon = require("sinon")
          const dataAccess = new DataAccess()
          sinon.stub(dataAccess, "deleteMemberDao").returns()
          const members = new Members(dataAccess)

          const society = "google-oauth2|107899758771884013642"
          const memberId = "d101b4dd-3873-484c-bf2c-0d7788dd2f12"

          return members.deleteMember(society, memberId).then(result => {
            expect(result).to.equal("")
          });

        });
      });

      describe("Get all members", () => {
        it("response should not be null", () => {
          const sinon = require("sinon")
          const dataAccess = new DataAccess()
          sinon.stub(dataAccess, "getMembersForSocietyDao").returns("")
          const members = new Members(dataAccess)

          const society = "google-oauth2|107899758771884013642"
          return members.getMembersForSociety(society).then(result => {
            expect(result).to.not.equal(null)
            const res = result.startsWith('{ "items": ')
            expect(res).to.equal(true)
          });
        });
      });

    })
