const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/newBlog', (req, res) => {
        if (!req.body.title){
            res.json({ success: false, message: 'Blog title is required.' });
        } else {
            if (!req.body.body){
                res.json({ success: false, message: 'Blog body is required.' });
            } else {
                if (!req.body.createdBy){
                    res.json({ success: false, message: 'Blog creator is required.' });
                } else {
                    const blog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy,
                    });
                    blog.save((err) => {
                        if (err) {
                            if (err.errors){
                                if (err.errors.title){
                                    res.json({ success: false, message: err.errors.title.message });
                                } else {
                                    if (err.errors.body){
                                        res.json({ success: false, message: err.errors.body.message });
                                    } else {
                                        res.json({ success: false, message: err.errors });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            console.log("====blog saved===="+JSON.stringify(blog));
                            res.json({ success: true, message: 'Blog saved!' });
                        }
                    })
                }
            }
        }
    });

    router.get('/allBlogs',(req, res) => {
        Blog.find({},(err, blogs) => {
            if (err){
                res.json({ success: false, message: err });
            } else {
                if (!blogs){
                    res.json({ success: false, message: 'No blogs found' });
                } else {
                    res.json({ success: true, blogs: blogs });
                }
            }
        }).sort({ '_id': -1 });
    });

    router.get('/getBlog/:id',(req, res) => {
        if (!req.params.id){
            res.json({ success: false, message: 'No blog ID was provided.' })
        } else {
            Blog.findOne({ _id: req.params.id },(err, blog) => {
                if (err){
                    res.json({ success: false, message: 'Not a valid  blog ID' });
                } else {
                    if (!blog){
                        res.json({ success: false, message: 'Blog not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: err }); // Return error
                            } else {
                              // Check if username was found in database
                              if (!user) {
                                res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                              } else {
                                // Check if the user who requested single blog is the one who created it
                                if (user.username !== blog.createdBy) {
                                  res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
                                } else {
                                  res.json({ success: true, blog: blog }); // Return success
                                }
                              }
                            }
                          });
                    }

                }
            });
        }
    });

    router.put('/updateBlog',(req, res) => {
        if (!req.body._id){
            res.json({ success: false, message: 'No blog ID  provided.' });
        } else {
            Blog.findOne({ _id: req.body._id },(err, blog) => {
                if (err){
                    res.json({ success: false, message: 'Not a valid  blog ID' });
                } else {
                    if (!blog){
                        res.json({ success: false, message: 'Blog not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err){
                                res.json({ success: false, message: err });
                            } else {
                                if (!user){
                                    res.json({ success: false, message: 'Unable to authenticate user.' });
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this blog post.' });
                                    } else {
                                        blog.title = req.body.title;
                                        blog.body = req.body.body;
                                        blog.save((err) => {
                                            if (err){
                                                console.log("===in if======"+err);
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Blog updated!' });
                                            }
                                        })
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
}