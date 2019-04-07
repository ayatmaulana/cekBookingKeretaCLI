[![gridly](https://preview.ibb.co/et8kTb/Screen_Shot_2018_01_21_at_09_29_54.png)]()

# Cek Booking Kereta CLI

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightred.svg?style=flat)]() [![Version](https://img.shields.io/npm/v/npm.svg)]() [![License](https://img.shields.io/github/license/ayatmaulana/cekBookingKeretaCLI.svg)]() [![](https://img.shields.io/github/downloads/ayatmaulana/cekBookingKeretaCLI/total.svg)]()

> Best CLI tool to check the Indonesian railway booking code as easily, quickly, and elegantly.

Just install it, and simplify your life.

## Installing

1. Yarn 

> yarn global add cek-booking-kereta

2. Npm 

> npm install -g cek-booking-kereta


## Usage

after installed globally, just run

> booking-kereta -c YOUR_BOOKING_CODE

**example**

> booking-kereta -c VHTM2P

[![gridly](https://media.giphy.com/media/xULW8pOp1lSoapEU8w/giphy.gif)]()


## :rocket: Depedency

List of depedencies that I use in this project

- CoffeeScript
- PhantomJs
- NightmareJs
- Cheerio
- Ora
- Commander
- Chalk
- Cli-table3

#### Testing

- Mocha
- Chai



## :cloud: Help

Then you can use the `booking-kereta -V` for see current version and `booking-kereta -h` for see help page:

```zsh
$ booking-kereta -h

  Usage: booking-kereta [options]


  Options:

    -V, --version              output the version number
    -c, --code [booking_code]  Booking Code
    -h, --help                 output usage information
```

## :zzz: Test

for unit testing, you just need to run this command

1. Using Yarn

> yarn test


2. Using Npm

> npm test


[![](https://media.giphy.com/media/xULW8JsNwKmrmdvl3q/giphy.gif)]()


## :scroll: License

MIT © [Ayat Maulana][website]

[website]: http://ayatmaulana.com
