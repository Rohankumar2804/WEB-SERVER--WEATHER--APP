const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const headerPath = path.join(__dirname, "../template/partials");
//console.log(viewsPath);
//console.log(path.join(__dirname));
// define path for express configration
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(headerPath);
// set up static directory to server
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });
// console.log(__dirname);
// console.log(__filename);
// app.get("/help", (req, res) => {
//   res.send({
//     name: "rohan",
//     age: 27,
//   });
// });
// app.get("/about", (req, res) => {
//   res.send("About the page");
// });
// app.get("/weather", (req, res) => {
//   res.send("Your weather is shown below");
// });
//app.com
//app.com/help
//app.com/about
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "rohan",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "rohan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    help: "This is some help text",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "rohan kumar",
    errormessage: "help page not found",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address field",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }
  return res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "rohan kumar",
    errormessage: "page not found",
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
