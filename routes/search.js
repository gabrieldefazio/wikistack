const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User
module.exports = router;

// router.get('/', (req, res, next) => {
//   const { tags } = req.query
//   Page.findAll({
//     where: {
//       tags: {
//         $overlap: req.query.tags
//       }
//     }
//   }).then((pages) => {
//     res.render('index', {allPages: pages});
//   }).catch(next)
// })

