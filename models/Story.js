const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    secondtitle: {
        type: String,
    },
    thirdtitle: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    info: {
        type: String,
    },
    desc: {
        type: String,
    },
    desc2: {
        type: String,
    },
    status: {
        type: String,
        default: 'public',
    },
    allowcomments: {
        type: Boolean,
        default: true,
    },
    comments: [{
        commentBody: {
            type: String,
            required: true,
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
});

module.exports = mongoose.model('stories', StorySchema, 'stories');