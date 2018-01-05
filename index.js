#!/usr/bin/env node

const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: false,
    webPreferences: {
        partition: 'nopersist',
    },
});

const cheerio = require('cheerio')
const commander = require('commander')
const ora = require('ora')
const Table = require('cli-table2');
const chalk = require('chalk');
const asciify = require('asciify')

var kode_boking 
// "Z55EJ8"


const spinner = ora("Fetching Data ... ")
spinner.color = "blue"
spinner.start()

const scrap = async ( code  ) => {

  await nightmare
        .viewport(1024, 768)
        .goto('https://kai.id/index.php/home')
        .click("#accordion .accordion-toggle:nth-child(3) h6")
        .wait(1000)
        .insert("#kode_booking", code)
        .wait(1500)
        .click("#submitcode")
        .wait(3000)
        .evaluate(() => {
            let getEl = document.querySelector('#data-input')
            if( getEl == null )
                return null
            
            return getEl.innerHTML
        })
        .end()
        .then(function (data) {
            if( data != null )
                cekBooking.load(data)
            else
                console.log( "data Not found" ); process.exit(1)
        })
        .catch(function (err) {
            console.log(err);
        });
}

const cekBooking = {
    html: null,
    passenger: null,
    general: null,
    load(html) {
        this.html = cheerio.load(html)
        this.parse()
    },
    parse(){
        this.parseGeneral()
        this.parsePassenger()
        this.output()
    },
    parseGeneral(){
        const $ = this.html
        this.general = {
            pembayaran: {
                status_bayar    : $($('.row:not(".head")')[0]).find(".row .columns:nth-child(1) dl dd").text(),
                total_bayar     : $($('.row:not(".head")')[0]).find(".row .columns:nth-child(2) dl dd").text()
            },
            perjalanan: {
                nama_kereta     : $($('.row:not(".head")')[1]).find(".row .columns:nth-child(1) dl dd").text(),
                kelas           : $($('.row:not(".head")')[1]).find(".row .columns:nth-child(2) dl dd").text(),
                berangkat       : $($('.row:not(".head")')[1]).find(".row .columns:nth-child(3) dl dd").text(),
                tiba            : $($('.row:not(".head")')[1]).find(".row .columns:nth-child(4) dl dd").text(),  
            }
        }
    },
    parsePassenger(){
        const $    = this.html
        let data   = $(".row:not('.head')")
        let length = data.length
        let start  = 2
        let end    = length - ( 2 - 1 )

        var res = [];
        for ( i = start; i <= end; i++ ) {
            res.push({
                nama:               $(data[i]).find(".row .columns:nth-child(1) dl dd").text(),
                id_number:          $(data[i]).find(".row .columns:nth-child(2) dl dd").text(),
                tipe:               $(data[i]).find(".row .columns:nth-child(3) dl dd").text(),
                tempat_duduk:       $(data[i]).find(".row .columns:nth-child(4) dl dd").text(),
                no_tiket:           $(data[i]).find(".row .columns:nth-child(5) dl dd").text(),
            })
        }

        this.passenger = res
    },
    output(){
        let output =  {
            general: this.general,
            passenger: this.passenger
        }

        spinner.succeed(" done ")

        var tableGeneral = new Table({});

        tableGeneral.push(
            [chalk.red("Status Bayar"), chalk.green(this.general.pembayaran.status_bayar)],
            [chalk.red("Total Bayar") , chalk.yellow(this.general.pembayaran.total_bayar)],
            [chalk.red("Nama Kereta") , this.general.perjalanan.nama_kereta],
            [chalk.red("Kelas")       , this.general.perjalanan.kelas],
            [chalk.red("Berangkat")   , this.general.perjalanan.berangkat],
            [chalk.red("Tiba")        , this.general.perjalanan.tiba]
        )
        console.log( tableGeneral.toString() )
        
        var tablePassenger = new Table({
            head: ['No', 'Nama', 'NO ID', 'Tipe', 'Tempat Duduk', 'Tiket']
        });
        
        this.passenger.map(( item, index ) => {
            tablePassenger.push(
                [ chalk.green(index+1) , item.nama , chalk.blue(item.id_number), item.tipe, item.tempat_duduk, item.no_tiket]
            );
        })
        console.log(tablePassenger.toString());
    }
}


const main =  () => {

    commander
        .version('v1.0.1')
        .option('-c, --code [booking_code]', 'Booking Code')
        .parse(process.argv)

	if (commander.code) scrap(commander.code)
    	else console.log("You must input Booking Code")
}



main()
