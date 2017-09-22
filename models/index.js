var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define("page", {
    title: Sequelize.STRING,
    urlTitle: Sequelize.STRING,
    content: Sequelize.TEXT,
    status: Sequelize.STRING
});

const User = db.define("user", {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {isEmail: true}
    }
});

module.exports = {
    Page: Page,
    User: User
};