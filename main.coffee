`#!/usr/bin/env node
`

myCredit = require('./credit.js')

# import SELF LIB
scraper = require('./dist/scraper')
extractor = require('./dist/extractor')

cheerio = require('cheerio')
commander = require('commander')
ora = require('ora')
kode_boking = undefined

config = require('./package.json')

spinner = ora('Fetching Data ... ')
spinner.color = 'blue'

main = ->
  commander.version( config.version )
           .option('-c, --code [booking_code]', 'Booking Code')
           .parse process.argv

  if commander.code
    myCredit()
    spinner.start()

    scrap = await scraper(commander.code)
    spinner.succeed 'Successfully fetching data'
    ext = extractor.load(scrap)
    spinner.succeed 'Finish extracting data \n'
    console.log ext[0]
    console.log ext[1]
  else
    console.log 'You must input Booking Code'
  
  process.exit(1)

main()

# ---
# generated by Ayat Maulana - 2018