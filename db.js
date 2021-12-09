const {Sequelize} = require('sequelize')
const path = require('path')

//create sequelize connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'expresstaurants.sqlite')
})

//export connection
module.exports = {sequelize}