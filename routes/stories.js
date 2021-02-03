const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Route
router.get('/', (req, res) => {
    Story.find({status: 'public'})
        .populate('user')
        .sort({date: 'desc'})
        .then(stories => {
            res.render('stories/index', {
                stories: stories,
                currentUser: req.user,
            });
        });
});

// Add Stroy Route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

router.get('/:id', function(req, res){
	Story.findOne({ 
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(showStory => {
        if(showStory.status == 'public') {
            res.render('stories/show', {
                showStory: showStory,
                currentUser: req.user,
            });
        } else {
            if(req.user) {
                if(req.user.id == showStory.user.id) {
                    res.render('stories/show', {
                        showStory: showStory,
                        currentUser: req.user,
                    });
                } else {
                    res.redirect('/stories');
                }
            } else {
                res.redirect('/stories');
            }
        }
	});
});

router.post('/', (req, res) => {
    let allowcomments;

    if(req.body.allowcomments) {
        allowcomments = true;
    } else {
        allowcomments = false;
    }

    const newStory = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        secondtitle: req.body.secondtitle,
        thirdtitle: req.body.thirdtitle,
        body: req.body.body,
        info: req.body.info,
        desc: req.body.desc,
        desc2: req.body.desc2,
        status: req.body.status,
        allowcomments: allowcomments,
        user: req.user.id,
    }

    // Create story
    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/${story._id}`);
        });
});

// Edit Story Route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    optionsArray = ['public', 'private', 'unpublished'];
    Story.findOne({ 
        _id: req.params.id
    })
        .then(story => {
            if(story.user != req.user.id) {
                res.redirect('/stories');
            } else {
                res.render('stories/edit', {
                    story: story,
                    optionsArray: optionsArray,
                });
            }
        });
    });

router.put('/:id', (req, res) => {
    Story.findOne({ 
        _id: req.params.id
    })
        .then(story => {
            let allowcomments;

            if(req.body.allowcomments) {
                allowcomments = true;
            } else {
                allowcomments = false;
            }

            // New Values
            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowcomments = allowcomments;

			story.secondtitle = req.body.secondtitle;
			story.info = req.body.info;

			story.thirdtitle = req.body.thirdtitle;
			story.desc = req.body.desc;

			story.subtitle = req.body.subtitle;
			story.desc2 = req.body.desc2;

            story.save()
                .then(story => {
                    res.redirect('/stories/' + req.params.id);
                });
        })
});

router.delete('/:id', function(req, res){
	Story.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect('/stories');
		} else {
			res.redirect('/stories');
		}
	});
});

router.post('/:id/comments', (req, res) => {
    Story.findOne({ 
        _id: req.params.id
    })
    .then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }

        // Push to commentys array
        story.comments.unshift(newComment);

        story.save()
        .then(story => {
            res.redirect(`/stories/${story.id}`);
        });
    });
});

// Stories Route
router.get('/user/:userId', (req, res) => {
    Story.find({user: req.params.userId,  status: 'public'})
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories,
                currentUser: req.user,
            });
        });
});

module.exports = router;