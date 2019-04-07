const useEmoji = emoji => process.platform == 'darwin' ? emoji : '[+]'

const myCredit = () => {
    console.log(` 
    oooOOOOOOOOOOO"
    o   ____          :::::::::::::::::: :::::::::::::::::: __|-----|__
    Y_,_|[]| --++++++ |[][][][][][][][]| |[][][][][][][][]| |  [] []  |
   {|_|_|__|;|______|;|________________|;|________________|;|_________|;
    /oo--OO   oo  oo   oo oo      oo oo   oo oo      oo oo   oo     oo
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    `)



    console.log( ` (c) Ayat Maulana ` )
    console.log( ` \n ` )
    console.log( ` ${useEmoji('🦊')}  Github: https://github.com/ayatmaulana/cekBookingKeretaCLI ` )
    console.log( ` ${useEmoji('👀')}  Issues: https://github.com/ayatmaulana/cekBookingKeretaCLI/issues ` )
    console.log( ` ${useEmoji('✍🏻')}  Contributors: https://github.com/ayatmaulana/cekBookingKeretaCLI/graphs/contributors`)
    console.log( ` \n ` )
}

module.exports = myCredit