import "mocha"
import { expect } from "chai"
import { parseSocietyId } from '../auth/utils';


describe("Authentication", () => {
  describe("Utils", () => {
    it("parseSocietyId", () => {
      const jwtToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVqaWNtaGktT2RFSDVkUlZ5WlREVSJ9.eyJpc3MiOiJodHRwczovL2Rldi1seHRjZXFzd3BwdjI1a29uLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzg5OTc1ODc3MTg4NDAxMzY0MiIsImF1ZCI6ImJrekNYTkVCVG0wTmVDbElsM2l4dzZKWVNvRGFXcThxIiwiaWF0IjoxNjcwNzUyNjcyLCJleHAiOjE2NzA3ODg2NzIsImF0X2hhc2giOiI2LXJvNWo1OTUyXzVVYWRwYUtSaEFBIiwic2lkIjoiUVJMRHZ4aDY1LURrZDNFSnBYTjJFdHFPd1JLb3h4bngiLCJub25jZSI6Im9JUG55NUs4Q01sdWlTUGgyZy1meVNLcU5UVEFSOFlNIn0.xH0Tg0IUxhEkXXuoV5ICBI8V4eQeEYype9CyocFcCsj4hpOx32f1lVyqhJSV0aMAjqAdbh7lec5D5z8ijFiS9UlNyu3JkodbBTnpFF1rq7kCM1fgOH9pzwbGQfqMldDY722qpQKAtEUqnKgdBREjTb143XAcvGtIb6neV57lX4K8J6enqk80TZHJZDBZkcWB4ficVrz8WA7Mhm0ruJUhSr_Woe5ylPt4TxhnQATZS3GOMuXshlT52Xkoq9fUR4hPhXO6kj2UtSXgAEHTDCQUC8j6ObAyMMFaWYTxWXRZON59N55VdKs0bGx83MGjuch4aGYF0IZzdk7glIB0j65j3w"
      const result = parseSocietyId(jwtToken)

      expect(result).to.be.equal("google-oauth2|107899758771884013642")

    })


  });
});

