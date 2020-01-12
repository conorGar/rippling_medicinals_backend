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


  //Get Teas
  ProductRouter.get('/tea', async(req,res) => {

    try{
      const teaProducts = await Product.findAll({
        where:{
          type:"tea"
        }
      })
      res.send(teaProducts)

    }catch(e){
      res.status(500).json({ msg: e.message })

    }
  })

  //Get all Tinctures
  ProductRouter.get('/tincture', async(req,res) => {

    try{
      const tinctureProducts = await Product.findAll({
        where:{
          type:["tincture-simple","tincture-formula"]
        }
      })
      res.send(tinctureProducts)

    }catch(e){
      res.status(500).json({ msg: e.message })

    }
  })


  //Get Simple Tinctures
  ProductRouter.get('/tincture/simple', async(req,res) => {

    try{
      const tinctureProducts = await Product.findAll({
        where:{
          type:"tincture-simple"
        }
      })
      res.send(tinctureProducts)

    }catch(e){
      res.status(500).json({ msg: e.message })

    }
  })

   //Get Formula Tinctures
   ProductRouter.get('/tincture/formula', async(req,res) => {

    try{
      const tinctureProducts = await Product.findAll({
        where:{
          type:"tincture-formula"
        }
      })
      res.send(tinctureProducts)

    }catch(e){
      res.status(500).json({ msg: e.message })

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
    console.log("Got Here---- product post aaa");
    try {
      const newProduct = await Product.create(request.body)
     
      
      response.json(newProduct)
    } catch (e) {
      response.status(500).json({ msg: e.message })
    }
  })


/********* UPDATE -- localhost:PORT//2 *********/
ProductRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const product = await Product.findByPk(id)
    if (!product) throw Error
   
    await product.update(request.body)
    response.json({
      product
    })
  } catch (e) {
    response.status(304).json({
      message: e.message
    })
  }
})



/********* DELETE -- localhost:PORT//2 *********/
ProductRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const product = await Product.findByPk(id)
    if (!product) throw Error
    await product.destroy()
    response.json({
      message: `product with id ${id} deleted`
    })
  } catch (e) {
    response.json({ msg: e.message })
  }
})

  module.exports = ProductRouter
