cheerio = require('cheerio')
commander = require('commander')
ora = require('ora')
Table = require('cli-table2')
chalk = require('chalk')
asciify = require('asciify')

cekBooking = 
  html: null
  passenger: null
  general: null

  load: (html) ->
    @html = cheerio.load(html)
    @parse()

  parse: ->
    @parseGeneral()
    @parsePassenger()
    @output()

  parseGeneral: ->
    $ = @html
    @general =
      pembayaran:
        status_bayar: $($('.row:not(".head")')[0]).find('.row .columns:nth-child(1) dl dd').text()
        total_bayar: $($('.row:not(".head")')[0]).find('.row .columns:nth-child(2) dl dd').text()
      perjalanan:
        nama_kereta: $($('.row:not(".head")')[1]).find('.row .columns:nth-child(1) dl dd').text()
        kelas: $($('.row:not(".head")')[1]).find('.row .columns:nth-child(2) dl dd').text()
        berangkat: $($('.row:not(".head")')[1]).find('.row .columns:nth-child(3) dl dd').text()
        tiba: $($('.row:not(".head")')[1]).find('.row .columns:nth-child(4) dl dd').text()
    return

  parsePassenger: ->
    $ = @html
    data = $('.row:not(\'.head\')')
    length = data.length
    start = 2
    end = length - (2 - 1)
    res = []
    i = start
    while i <= end
      res.push
        nama: $(data[i]).find('.row .columns:nth-child(1) dl dd').text()
        id_number: $(data[i]).find('.row .columns:nth-child(2) dl dd').text()
        tipe: $(data[i]).find('.row .columns:nth-child(3) dl dd').text()
        tempat_duduk: $(data[i]).find('.row .columns:nth-child(4) dl dd').text()
        no_tiket: $(data[i]).find('.row .columns:nth-child(5) dl dd').text()
      i++
    @passenger = res
    return
    
  output: ->
    output =
      general: @general
      passenger: @passenger

    tableGeneral = new Table({})
    tableGeneral.push [
      chalk.red('Status Bayar')
      chalk.green(@general.pembayaran.status_bayar)
    ], [
      chalk.red('Total Bayar')
      chalk.yellow(@general.pembayaran.total_bayar)
    ], [
      chalk.red('Nama Kereta')
      @general.perjalanan.nama_kereta
    ], [
      chalk.red('Kelas')
      @general.perjalanan.kelas
    ], [
      chalk.red('Berangkat')
      @general.perjalanan.berangkat
    ], [
      chalk.red('Tiba')
      @general.perjalanan.tiba
    ]

    tablePassenger = new Table(head: [
      'No'
      'Nama'
      'NO ID'
      'Tipe'
      'Tempat Duduk'
      'Tiket'
    ])

    @passenger.map (item, index) ->
      tablePassenger.push [
        chalk.green(index + 1)
        item.nama
        chalk.blue(item.id_number)
        item.tipe
        chalk.yellow(item.tempat_duduk)
        item.no_tiket
      ]
      return
    
    return [ tableGeneral.toString(), tablePassenger.toString() ]

module.exports = cekBooking
