const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes/index'))
nunjucks.configure('views', { noCache: true});

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
app.set('viws', __dirname + '/views');
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

models.db.sync({force: false})
    .then(function () {
        app.listen(3000, function () {
            console.log('Server is listening on port 3001!');
        });
    });


