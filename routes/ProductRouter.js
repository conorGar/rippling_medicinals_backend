const express = require('express')
const {Product} = require('../database/models')
const ProductRouter = express.Router()


ProductRouter.get('/', async (request, response) => {
    try {
      console.log('request')
      const allProducts = await Product.findAll()
  
      response.send(allProducts)
    } catch (e) {
      response.status(500).json({ msg: e.message })
    }
  })
  


/********* GET -- localhost:PORT//2 *********/


ProductRouter.get('/:id', async (request, response) => {
    try {
      const id = request.params.id
      const product = await Product.findByPk(id)
      if (!product) throw Error
      response.send(product)
    } catch (e) {
      response.status(404).json({ msg: e.message })
    }
  })


  /********* CREATE -- localhost:PORT/ *********/
ProductRouter.post('/create', async (request, response) => {
    console.log("Got Here---- product post");
    try {
      const newProduct = await Product.create(request.body)
     
      
      response.json(newProduct)
    } catch (e) {
      response.status(500).json({ msg: e.message })
    }
  })

  module.exports = ProductRouter
