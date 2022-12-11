import "mocha"
import { expect } from "chai"
import * as winston from 'winston'
import { createLogger } from "../utils/logger";


describe("Logger", () => {
  describe("Utils", () => {
    it("createLogger not to be null", () => {
      const result = createLogger("authLogger")

      expect(result).to.be.not.null
    })

    it("create logger of type Winston logger", () => {
      const result = createLogger("authLogger")
      const logger = winston.createLogger({
        level: 'info'
      })
      expect(result.prototype).to.equal(logger.prototype)
    })


  });
});
