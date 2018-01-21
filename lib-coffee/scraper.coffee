Nightmare = require('nightmare')
nightmare = Nightmare(
  show: false
  webPreferences: partition: 'nopersist'
)
extractor = require('./extractor')

scrap = (code) ->
  try
    scraping = await nightmare.viewport(1024, 768)
                              .goto('https://kai.id/index.php/home')
                              .click('#accordion .accordion-toggle:nth-child(3) h6')
                              .wait(1000)
                              .insert('#kode_booking', code)
                              .wait(1500)
                              .click('#submitcode')
                              .wait(3000)
                              .evaluate(->
                                getEl = document.querySelector('#data-input')
                                if getEl is null
                                  return null
                                getEl.innerHTML
                              )
                              .end()

    if scraping is null
      console.log 'data Not found'
      process.exit 1

    return scraping
  catch e
    console.log e
  return

module.exports = scrap

