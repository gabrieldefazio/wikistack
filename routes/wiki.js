const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    console.log(req.body)

    const page = Page.build({
        title: req.body.title,
        content: req.body.content,
        name: req.body.name,
        email: req.body.email
    });
    // User.findOrCreate({
    //     where:{
    //         name: req.body.name
    //     }
    // })
    page.save().then((savedPage)=>{
        res.render('./wikipage', { currentPage: savedPage }) });
});

router.get('/add', function(req, res, next) {
    res.render('./addpage');
});

router.get('/:urlTitle', (req, res, next) =>{
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    }).then((foundPage) => {
        console.log(foundPage)
        res.render('./wikipage', { currentPage: foundPage });
    }).catch(next);
});

router.get('/add', function(req, res, next) {

});


module.exports = router;
