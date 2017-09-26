const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post("/", function(req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
        .then(function(user) {
            return Page.create(req.body)
              .then(function(page) {
                return page.setAuthor(user[0]);
            });
        })
      .then(function(page) {
            res.redirect(page.route);
        })
        .catch(next);
});


router.get('/add', function(req, res, next) {
    res.render('./addpage');
});

router.get('/search/:tag', (req, res, next) => {
  Page.findByTag(req.query.tag)
    .then((page) =>{
      res.render('index', { page : page })
    })
    .catch(next)
})

router.get('/:urlTitle', (req, res, next) =>{
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
    .then(function (page) {
      if (page === null) {
        res.status(404).send();
      } else {
        res.render('wikipage', {
          page: page
        });
      }
    })
    .catch(next);
});


module.exports = router;
