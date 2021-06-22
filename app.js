//jshint esversion:6
//IMPORT BOILERPLATE
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');//Tells app to use ejs as view engine
app.use(express.urlencoded({extended: true}));//Enables us to parse Data to backend easily
app.use(express.static("public"));

const items = [];
const workItems = [];

//MAIN BASE PAGE
app.get("/", function(req, res){
    const day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems: items})
});

//MAIN WORK PAGE
app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

//ABOUT SECTION 
app.get("/about", (req, res) => {
    res.render("about");
})

//SENDS RESPONSE TO WEBSITE DEPENDING ON WHERE WE ADDED ITEMS 
app.post('/', (req, res) => {
    const item = req.body.newItem;

    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } 
    else{
        items.push(item);
        res.redirect("/");
    }
});

//DEFINES THE PORT FOR THE APP TO LISTEN TO
app.listen(3000, () => {
    console.log("Server Started");
});