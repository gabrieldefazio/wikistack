var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods: {
        route(){
            return `/wiki/${this.urlTitle}`
        }
    }
});

Page.hook('beforeValidate', (page, title) =>{
    page.urlTitle = getUrlTitle(page.title)
});

function getUrlTitle(title){
    if (title) return title.replace(/\s+/g, '_').replace(/\W/g, '');
    else return Math.random().toString(36).substring(2, 7);
}

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User,
    db: db
};