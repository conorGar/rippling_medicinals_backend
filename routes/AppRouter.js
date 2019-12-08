const express = require('express')
const appRouter = express.Router()
// const { passport } = require('../auth/auth')
const { BlogPost, Admin } = require('../database/models')


// appRouter.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   res.json({ user: req.user, message: 'authenticated' })
//   console.log(req)
// })


//Get all blog posts
appRouter.get('/', async (request, response) => {

    console.log("got here - user router")
    try {
      const blogPosts = await BlogPost.findAll()
      response.send(blogPosts)
    } catch (e) {
      response.status(500).json({ msg: e.message })
    }
  })

appRouter.get('/:id', async (req,res) => {
    const id = req.params.id
    try{
        const blog = await BlogPost.findByPk(id)
        if (!blog) throw Error
        res.send(blog)
    }catch(e){
        res.status(404).json({ msg: e.message })
    }
})

/********* CREATE -- localhost:PORT/ *********/
appRouter.post('/blog/create', async (request, response) => {
    try {
      const newBlog = await BlogPost.create({title: request.body.title, description: request.body.model, imgUrl: request.body.imgUrl})
      response.json({
        newBlog
      })
      const admin = await Admin.findByPk(1); //Currently Hardcoded for One admin
      newBlog.belongsTo();
    } catch (e) {
      response.status(500).json({ msg: e.message })
    }
  })

  /********* UPDATE -- localhost:PORT/2   Edit blog post *********/
appRouter.put('/:id', async (request, response) => {
    try {
      const id = request.params.id
      const updatedBlog = await BlogPost.findByPk(id)
  
      if (updatedBlog) await updatedBlog.update(request.body)
      response.json({
        updatedBlog
      })
    } catch (e) {
      response.status(304).json({
        message: e.message
      })
    }
  })
  

/********* DELETE BLOG POST -- localhost:PORT/2 *********/
appRouter.delete('/:id', async (request, response) => {
    try {
      const id = request.params.id
  
      await BlogPost.destroy({
        where: {
          id: id
        }
      })
  
      response.json({
        message: `User with id ${id} deleted`
      })
    } catch (e) {
      response.json({ msg: e.message })
    }
  })

module.exports = appRouter
