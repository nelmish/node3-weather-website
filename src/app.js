const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Standarduser"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Standarduser"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This ist the page about helping us!",
        name: "Standarduser"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided!"
        })
    };

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        });

    });
});



app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({ // dadurch wird der rest nicht mehr ausgefuehrt
            error: "You must provide a search term"
        });
    };
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        message: "Help article not found",
        name: "Standarduser"
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        message: "Page not found",
        name: "Standarduser"
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}.`)
});