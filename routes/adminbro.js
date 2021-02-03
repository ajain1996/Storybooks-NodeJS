// ================================================
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const mongoose = require('mongoose');
const AdminBroMongoose = require('admin-bro-mongoose')

// Listing model
const Listing = require('../models/Story');

// User model
const User = require('../models/User');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    databases: [mongoose],

    resources: [{
        resource: User,
        options: {
            parent: {
                name: 'Admin Content [Users]',
                icon: 'fa fa-list'
            },
            properties: {
                firstName: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                lastName: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                image: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                date: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
            },
        },
    }],

    resources: [{
        resource: Listing,
        options: {
            parent: {
                name: 'Admin Content',
                icon: 'fa fa-list'
            },
            properties: {
                secondtitle: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                subtitle: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                thirdtitle: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                allowcomments: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                comments: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                date: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                user: {
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                body: {
                    type: 'richtext',
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                info: {
                    type: 'richtext',
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                desc: {
                    type: 'richtext',
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
                desc2: {
                    type: 'richtext',
                    isVisible: {
                        show: true, edit: false, filter: false, list: false,
                    }
                },
            },
        },
    }],
    rootPath: '/admin',
    branding: {
        companyName: 'StoryBooks Admin'
    }
});

const ADMIN = {
    email: 'admin@gmail.com',
    password: 'admin@1234',
}

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        if (ADMIN.email === email && ADMIN.password === password) {
            return ADMIN;
        }
        return null;
    },
    cookieName: 'adminbro123',
    cookiePassword: 'somepassword123',
});

// ================================================
module.exports = router;