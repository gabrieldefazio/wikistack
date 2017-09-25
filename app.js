const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')
const models = require('./models');
const Promise = require('bluebird');

app.use(morgan('dev'))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes/index'))
const env = nunjucks.configure('views', { noCache: true});

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

models.db.sync({force: false})
    .then(function () {
        app.listen(3000, function () {
            console.log('Server is listening on port 3001!');
        });
    });


