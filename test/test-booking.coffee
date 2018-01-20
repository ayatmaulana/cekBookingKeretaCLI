assert = require('assert')
scraper  = require('../lib/sraper.js')
extractor = require('../lib/extractor')

bookingCode = "Z55EJ8"
resultOfRequest  = null

describe "Writen by Ayat Maulana", ->
  describe "cekBookingCLI test", ->
    @timeout 25000
    
    it "fetching data of bookingCode = " + bookingCode, (done) ->
        scrap = await scraper bookingCode
        resultOfRequest = scrap
        assert.equal(typeof scrap, "string")
        done()

    describe "extracting data", ->
      it "general data", () ->
        general = extractor.load resultOfRequest
        assert.equal(typeof general[0], "string")

      it "passenger data", ->
        passenger = extractor.load resultOfRequest
        assert.equal(typeof passenger[1], "string")
      
    
