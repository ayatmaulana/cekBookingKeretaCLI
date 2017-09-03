const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: false,
    webPreferences: {
        partition: 'nopersist',
    },
});
const tabletojson = require('tabletojson')
const cheerio     = require('cheerio')
const collect     = require('collect.js')

const kode_boking = "Z55EJ8"

nightmare
    .goto('https://tiket.kereta-api.co.id/?_it8tnz=TXc9PQ==&_8dnts=WTJobFkycz0=')
    .insert("input[name=kode_booking]", kode_boking)
    .click("input[type=submit]")

nightmare
    .wait(1000)
    .evaluate( () => {
        return document.querySelector('.itReservationContent').innerHTML
    })
    .end()
    .then(function (data) {
        cekBooking.load( data )
    })
    .catch(function (err) {
        console.log(err);
    });


    const cekBooking = {
        html: null,
        passanger: null,
        load( html ) {
            this.html  = cheerio.load( html )
            this.parse()
        },
        parse() {
            const $       = this.html
            let penumpangHtml = $('table:nth-child(2) tr')

            var tbl = penumpangHtml.map(function() {
                return $(this).find('td').map(function() {
                  return $(this).html();
                }).get();
              }).get();

            var atbl = tbl.filter( (item, i) => {
                return i >= 6
            })

            let c = collect(atbl)
            const ch = c.chunk(6)

            let haha = ch.map( item => {
                return {
                    number: item[0],
                    nama: item[1],
                    no: item[2],
                    tipe: item[3],
                    duduk: item[4],
                    tiket: item[5]
                }
            } )

            this.passanger = haha
            console.log(this.parseGeneral())

        },
        parseGeneral(){
            const $ = this.html

            return  {
                    pembayaran : {
                         status_bayar : $('table:nth-child(1) tr:nth-child(3) td:nth-child(3) span').html(),
                         total_bayar : $('table:nth-child(1) tr:nth-child(4) td:nth-child(3) span').html()                
                    },
                    informasi: {
                        nama_kereta : $('table:nth-child(1) tr:nth-child(6) td:nth-child(3) span').html(),
                        kelas: $('table:nth-child(1) tr:nth-child(7) td:nth-child(3)').html(),
                        asal: $('table:nth-child(1) tr:nth-child(8) td:nth-child(3)').html(),
                        tujuan: $('table:nth-child(1) tr:nth-child(9) td:nth-child(3)').html(),
                        berangkat: $('table:nth-child(1) tr:nth-child(10) td:nth-child(3)').text(),
                        datang: $('table:nth-child(1) tr:nth-child(11) td:nth-child(3)').text(),
                    },
                    penumpang: this.passanger.toArray()
                 }
        }

    }