Puppeteer = require('puppeteer')
extractor = require('./extractor')

scrap = (code) ->
  try
    browser = await Puppeteer.launch(
        headless: true
    )
    page = await browser.newPage()
    await page.setRequestInterception(true)

    # disable image source request
    # purpose -> to speed up the process of loading pages 
    page.on('request', (request) ->
      if (request.resourceType() == 'image')
        request.abort()
      else
        request.continue()
    )

    # handling alert box when codebooking not found
    page.on('dialog', (dialog) ->
      await dialog.dismiss()
      await page.close()
      await browser.close()
      throw new Error('data not found')
    )

    scrap = await page.goto('https://kai.id/index.php/home')
    await page.setViewport({ width: 1366, height: 768 })
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36')
    await page.click('#accordion .accordion-toggle:nth-child(3) h6')
    await page.type('#kode_booking', code)
    await page.click('#submitcode')
    await page.waitFor(3000)
    content = await page.evaluate(->
      getEl = document.querySelector('#data-input')
      if getEl is null
        throw new Error('data not found ')
      getEl.innerHTML
    )
    await page.close()
    await browser.close()

    if content is null
      console.log 'data Not found'
      process.exit 1

    return content
  catch e
    process.exit 1
  return

module.exports = scrap

