var models = require('./models');

Page.sync().then(()=>models.Page.sync({}))


User.sync();

