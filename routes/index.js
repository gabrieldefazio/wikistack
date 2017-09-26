const router = require('express').Router();
const wikiRoute = require('./wiki');
const userRoute = require('./user');
const models = require('../models');
const Page = models.Page;

router.use('/wiki', wikiRoute);
router.use('/user', userRoute);

router.get('/', (req, res, next) => {
    Page.findAll().then((pages) => {
        res.render('index', { allPages: pages });
    }).catch(next);
});

module.exports = router;
