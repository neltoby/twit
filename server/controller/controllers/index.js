const Users = require('../../models').Users
const Post = require('../../models').Post
const Likes = require('../../models').Likes
const Comment = require('../../models').Comment
const bcrypt = require('bcryptjs');
// const redis = require('redis')
const sendMail = require('../util').sendMail

// const REDIS_PORT = process.env.REDIS_PORT || 6379

// const redisClient = redis.createClient(REDIS_PORT)

const filterUserDetails = user => {
    const sentValues = user.dataValues
    sentValues.username = sentValues.email.split('@')[0]
    delete sentValues.password
    return sentValues
}

module.exports = () => {
    return {
        login: async (req, res, next) => {
            try{
                const { email, password } = req.body               
                const user = await Users.findOne({ where: { email } })
                if(user === null){
                    res.status(401).json({success: false, msg: 'email password mismatch'})
                }else{
                    bcrypt.compare(password, user.password, function(err, response) {
                        if(err){
                            res.status(404).json({success: false, msg: 'email password mismatch'})
                        }else{
                            if(response){
                                req.user = filterUserDetails(user)
                                next()
                            }else{
                                res.status(404).json({success: false, msg: 'email password mismatched'})
                            }
                        }
                    });
                }               
            }catch(e){
                res.status(500).json({success: false, msg: e})
            }
        },
        registration: async (req, res, next) => {
            const { fullname, email, password } = req.body       
            const user = await Users.findOne({ where: { email } })
            if(user === null){
                const newUser = await Users.create({ name: fullname, email, password })
                req.user = filterUserDetails(newUser)
                const emailData = {email: newUser.email, fullname: newUser.name}
                sendMail(emailData)
                next()
                // res.json({ ...newUser, token })
            }else{
                res.status(400).json({success: false, msg: 'email already exist'})
            }
        }, 
        postTwit: async (req, res, next) => {
            try{
                const { id, posts } = req.body
                if(posts.trim().length){
                    let newPost
                    if(req.body.image){
                        newPost = await Post.create({ UserId: id, posts, image: req.body.image })
                    }else{
                        newPost = await Post.create({ UserId: id, posts })                       
                    }
                    const sentPost = await Post.findOne({ where: {id: newPost.id}, include: [{model: Comment}, {model: Likes}, {model: Users, attributes: ['name']}]})
                    res.json(sentPost)
                }else{
                    res.status(400).json({success: false, msg: 'Bad request'})
                }
            }catch(e) {
                res.status(500).json({success: false, msg: e})
            }
        },
        getUser: async (req, res, next) => {
            try{
                const { id } = req.body
                if(isNaN(id)){
                    res.status(400).json({success: false, msg: 'Bad request'})
                }else{
                    const user = await Users.findOne({ where: {
                        id
                    }})
                    if(user === null) {
                        res.status(404).json({success: false, msg: 'User not found'})
                    }else{
                        const sentDetails = filterUserDetails(user)
                        res.json(sentDetails)
                    }
                }
            }catch(e) {
                console.log(e)
                res.status(500).json({success: false, msg: e})
            }
        },
        getUserById: async (req, res, next) => {
            try{
                const { id } = req.params
                if(isNaN(id)){
                    res.status(400).json({success: false, msg: 'Bad request'})
                }else{
                    const user = await Users.findOne({ where: {
                        id
                    }})
                    if(user === null) {
                        res.status(404).json({success: false, msg: 'User not found'})
                    }else{
                        const sentDetails = filterUserDetails(user)
                        res.json(sentDetails)
                    }
                }
            }catch(e) {
                console.log(e)
                res.status(500).json({success: false, msg: e})
            }
        },
        allTwit: async (req, res, next) => {
            try{
                const posts = await Post.findAll({ include: [{model: Comment, include: [{model: Users, attributes: ['name']}]}, {model: Likes}, {model: Users, attributes: ['name']}]})
                res.json(posts)
            }catch(e) {
                res.status(500).json({success: false, msg: e})
            }
        },
        likePost: async (req, res, next) => {
            try{
                const { id } = req.body
                const { postId } = req.params
                if(isNaN(postId)){
                    res.status(400).json({success: false, msg: 'Bad request'})
                }else{
                    const post = await Post.findOne({ where: { id: postId}})
                    if(post === null) {
                        res.status(404).json({success: false, msg: 'Post does not exist'})
                    }else{
                        const postlike = await Likes.findOne({ where: {
                            PostId: postId, UserId: id
                        }})
                        if(postlike === null){
                            const likes = await Likes.create({ UserId: id, PostId: postId})
                            res.json(likes)
                        }else{
                            res.json(postlike)
                        }                        
                    }
                }
            }catch(e){
                res.status(500).json({success: false, msg: e})
            }
        },
        unlikePost: async (req, res, next) => {
            try{
                const { id } = req.body
                const { postId } = req.params
                if(isNaN(postId)){
                    res.status(400).json({success: false, msg: 'Bad request'})
                }else{
                    const unlike = await Likes.destroy({ where: {
                        PostId: postId,
                        UserId: id
                    }})
                    res.status(204).json({success: true})
                }
            }catch(e){
                res.status(500).json({success: false, msg: e})
            }
        },
        commentPost: async (req, res, next) => {
            try{
                const { id, postid, comment } = req.body
                const post = await Post.findOne({ where: {id: postid}})
                if(post === null){
                    res.status(404).json({success: false, msg: 'Post does not exist'})
                }else{
                    const userComment = await Comment.create({ UserId: id, PostId: postid, comment })
                    const userDetails = await Comment.findOne({ where: {
                        id: userComment.id
                    }, include: [{model: Users, attributes: ['name']}]})
                    res.json(userDetails)
                }               
            }catch(e){
                res.status(500).json({success: false, msg: e})
            }
        },
        deletePost: async (req, res, next) => {
            try{
                const { id } = req.body
                const { postId } = req.params
                if(isNaN(postId)){
                    res.status(400).json({success: false, msg: 'Bad request'})
                }else{
                    const post = await Post.findOne( { where: { id: postId}}) 
                    if(post === null){
                        res.status(404).json({success: false, msg: 'Post not found'})
                    } else {
                        if(post.UserId === id) {
                            const deletedPost = await Post.destroy({ where: {
                                id: postId
                            }})
                            res.status(204).json(deletedPost)
                        }else{
                            res.status(401).json({success: false, msg: 'Unauthourized request'})
                        }  
                    }  
                }   
            }catch(e) {
                res.status(500).json({success: false, msg: 'server error'})
            }
        }
    }
}