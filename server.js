const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const path = require('path');
const tasksRoutes = require('./routes/tasks');

const port = 49160;
const host = 'localhost';

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(tasksRoutes);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

async function start() {
    try {
        await mongoose.connect("mongodb+srv://user:user@mongo-db.rdyrq.mongodb.net/sfcc_tasks", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (e) {
        console.log(e);
    }
}

start();

module.exports = app;