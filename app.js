const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://admin:admin@node-crash-course.2vbeb.mongodb.net/node-crash?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log("err", err, "err"))

// register view engine
app.set("view engine", "ejs");

// listen for request
// app.listen(3000)

// middleware and static files
app.use(express.static("public"))
app.use(express.urlencoded({ extended:true }))
app.use(morgan("dev"))

app.use((req, res, next) => {
    console.clear()
    console.log("new request made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
})

// get requests
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/about", (req, res) => {
    //res.send("about");
    //res.sendFile("./views/about.html", {root: __dirname})
    res.render("about", { title: "About" })
})

app.use("/blogs",blogRoutes)


// redirects
app.get("/about-us", (req, res)=>{
    res.redirect("/about")
})


// 404 page : Should go to the bottom
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404", { title: "404 Error" })
})