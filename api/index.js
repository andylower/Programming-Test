var express = require('express');
var app = express();

// get headers from file and pass back
app.get('/headers', function(req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  const csv = require('csv-parser');
  const fs = require('fs');
  const results = [];

  // read default csv and push rows to results
  fs.createReadStream('./worldcities.csv')
  .pipe(csv())
  .on('headers', (headers) => {
    headers.map((h) => {
      
      results.push(h)
    });
    res.status(200).send(results);
    res.end();
  })
  .on('error', (err) => {
    res.status(500).send(err);
  })
  
});

// downloading the file passed back from /generate
app.get('/download', function(req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');

  var file = req.query.file;
  const fs = require('fs');
  if (fs.existsSync(`./${file}`)) {
    res.status(200).download(`./${file}`, file);
  } else {
    res.status(500).send({message: "We couldn't download your new report, please try again."})
  }  
});

// read file and build report from valid rows
app.get("/generate", function(req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');

  const csv = require('csv-parser')
  const fs = require('fs')
  const columns = [];
  const { city, pop, remove, zeros } = req.query;

  var valid = true, popArray = [], results = [];
  var dataError = "City names should not be empty and populations should not contain non-numeric characters.";
  var total = 0, smallest = undefined, largest = 0;
  var largestCity = '';
  var smallestCity = '';

  if (city && pop) {
    // read default csv and push rows to results
    var readStream = fs.createReadStream('worldcities.csv')
    .pipe(
      csv(
        {
          mapHeaders: ({ header }) => {
            // if the column doesn't match city or population columns, return null to remove
            if (header !== city && header !== pop) {
              return null;
            } else {
              columns.push(header);
              return header;
            }
          }
        }
      )
    )
    .on('data', (row) => {
      var population = row[pop];
      var cityName = row[city];
      if (cityName) {
        // check if population empty or is NaN
        // remove row or change to zero, based on choice by user
        var empty = (population === "");
        if (isNaN(population) || empty) {
          if (empty) {
            if (remove === "0") {
                row[pop] = "0";
                results.push(row);
            }
          } else {
            // population contains non-numerical data that isn't blank
            valid = false;
          }
        } else {
          if (population < 0) {
            valid = false;
            dataError = "A population cannot be a negative number.";
          } else {
            var parsedPop = parseInt(population);
            if (!(zeros === "0" && parsedPop === 0)) {
                results.push(row);
            }
          }
        }
      } else {
        valid = false;
      }
      if (!valid) {
        readStream.destroy();
        res.status(500).send({message: dataError});
      }
    })
    .on('end', () => {

      // use package to create csv from the 2 columns we have
      const Json2csvParser = require('json2csv').Parser;
      const json2csvParser = new Json2csvParser({ columns });
      const csvData = json2csvParser.parse(results);
    
      // create two column csv file with random name, to avoid duplication
      var randomstring = require("randomstring").generate(16);
      var newfile = `${randomstring}.csv`;

      fs.writeFile(newfile, csvData, function(err) {
        // now generate report and send download link
        var simpleStream = fs.createReadStream(newfile)
        .pipe(csv())
        .on('data', (row) => {
          var population = row[pop];
          var cityName = row[city];
          var parsedPop = parseInt(population);
          
          // update small and large details if necessary
          largestCity = (parsedPop > largest) ? cityName : largestCity;
          smallestCity = (parsedPop < smallest || !smallest) ? cityName : smallestCity;
          largest = (parsedPop > largest) ? population : largest;
          smallest = (parsedPop < smallest || !smallest) ? population : smallest;

          // update total for average calculation later
          total += parsedPop;
          popArray.push(parsedPop);

        })
        .on('end', () => {
          // calculate average and get smallest and biggest population
          var cityCount = popArray.length;
          var average = (total/cityCount);
          var info = `Based on ${cityCount} cities`;
          var outJson = [
            {
              "stat": "Average Population",
              "city": info,
              "population": average
            },{
              "stat": "Smallest Population",
              "city": smallestCity,
              "population": smallest
            },{
              "stat": "Largest Population",
              "city": largestCity,
              "population": largest
            }
          ];

          res.status(200).send(outJson);
         
        })
        .on('error', (err) => {
          res.status(500).send({message: err});
        });
      }); 
    })
    .on('error', (err) => {
      res.status(500).send({message: err});
    });
  } else {
    res.status(500).send({message: 'Please specify the city and population columns in step 2 and 3.'});
  }
});

// I want to force port 3000 here
// I can then hardcode the port in the front-end functions/index.js file.
app.listen(3000, function () {
  console.log('Ready to go on port 3000!');
});