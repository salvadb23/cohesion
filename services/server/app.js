// app.js
// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// MIDDLEWARE
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: require('handlebars-helpers')()
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// LISTENER
if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
