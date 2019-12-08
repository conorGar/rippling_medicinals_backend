const { Admin, BlogPost, Product} = require('./models')



const main = async () => {
    try {
      // empty both tables
      await Admin.destroy({ where: {} })
      await BlogPost.destroy({ where: {} })
  
      //user seed
      const Shannon = await Admin.create({
        name: 'Shannon Garity',
        username: 'shannongar',
        password: 'medicine1992'
      })
    
  
      //project seed
      const post1 = await BlogPost.create({
        title: 'Test Post',
        description: 'This is first blog post yay',
        imgUrl: 'https://www.verywellhealth.com/thmb/g6ZvER87sfrNdrmdc00JIgAQOqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-155098400-5b6102b84cedfd005062a2c5.jpg'
      })


      const product1 = await Product.create({
        title: 'Immune Unity',
        description: 'Immune unity is formulated to help the systems of our body come into union with the world around us. This formula can help prevent illness by supporting the immune system and our bodies natural process of removing pathogens from the body in a safe and healthy way.',
        imgUrl: 'https://www.verywellhealth.com/thmb/g6ZvER87sfrNdrmdc00JIgAQOqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-155098400-5b6102b84cedfd005062a2c5.jpg',
        ingredients: 'ingredient1, ingredient2, ingredient3'
      })

      const product2 = await Product.create({
        title: 'Immune Unity',
        description: 'Immune unity is formulated to help the systems of our body come into union with the world around us. This formula can help prevent illness by supporting the immune system and our bodies natural process of removing pathogens from the body in a safe and healthy way.',
        imgUrl: 'https://www.verywellhealth.com/thmb/g6ZvER87sfrNdrmdc00JIgAQOqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-155098400-5b6102b84cedfd005062a2c5.jpg',
        ingredients: 'ingredient1, ingredient2, ingredient3'
      })

     
  
      await post1.setAdmin(Shannon)

  
    } catch (error) {
      throw error
    } finally {
      process.exit()
    }
  }
  
  main()
  