const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const location = req.body.cityName;
  const apiKey = "ae69c186a38a8e4911d6ae040a9d980f";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +location+ "&appid=" +apiKey+ "&units=" +units ;
  https.get(url, function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
          const weatherdata = JSON.parse(data);
          const weatherTemp = weatherdata.main.temp;
          const weatherDescription = weatherdata.weather[0].description;
          const weatherIcon = weatherdata.weather[0].icon;
          imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          res.write("<p>the weather is currently " + weatherDescription + "</p>")
          res.write("<h1>the temp in "+location+" is " + weatherTemp + "degree celcius.</h1>")
          res.write("<img src = "+ imageUrl +">");
          res.send()
      });
  });
});

app.listen(8080, function () {
  console.log("server is start on port 8080..........");
});
