const tabletojson = require('tabletojson')

tabletojson.convertUrl(
    'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes',
    { stripHtmlFromCells: false },
    function(tablesAsJson) {
      //Print out the 1st row from the 2nd table on the above webpage as JSON  
      console.log(tablesAsJson);
    }
  );