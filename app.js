//jshint esversion:6

const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.render("index", {
    fname: "you",
    sname: "me",
    per: 100,
    mes: "we are perfect for each other"
  });
});

app.post("/", function (req, res) {
  const fn = req.body.fname;
  const sn = req.body.sname;
  console.log(fn+" and "+sn);
  if (fn == "" || sn == "") {
    res.render("index", {
      fname: "you",
      sname: "me",
      per: 100,
      mes: "we are perfect for each other"
    });
  } 
  else {
    const url = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + fn + "&sname=" + sn + "&rapidapi-key=e33eddff56msh5893565dee1d3c7p1d2686jsn17118edd08cc";
    https.get(url, function (response) {
      response.on("data", function (data) {
        lovecalc = JSON.parse(data);
        const percentage = lovecalc.percentage;
        const message = lovecalc.result.toLowerCase();
        res.render("index", {
          fname: fn,
          sname: sn,
          per: percentage,
          mes: message
        });
      });
    });
  }
});


app.listen(process.env.PORT || 3000);