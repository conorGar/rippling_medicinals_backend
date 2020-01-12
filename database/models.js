const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

// const db = new Sequelize({
//     database: 'ripplingmedicinals_db',
//     dialect: 'postgres'
//   })
  
let db;

  db = new Sequelize(process.env.DATABASE_URL , {
    dialect: 'postgres'
  });

const Admin = db.define('admin', {
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    username: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const BlogPost = db.define('blogpost', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT
    },
    imgUrl:{
        type: Sequelize.STRING
    }
})

const Product = db.define('product', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    imgUrl:{
        type: Sequelize.STRING
    },
    ingredients:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.INTEGER
    }
})

Admin.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword
  })

Admin.hasMany(BlogPost)

BlogPost.belongsTo(Admin)

module.exports ={
    db,
    Admin,
    BlogPost,
    Product
}