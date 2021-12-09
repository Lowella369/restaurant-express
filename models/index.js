const {sequelize, DataTypes, Model} = require('../db')

//import models
const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')



//association models
Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)
Menu.hasMany(Item)
Item.belongsTo(Menu)

//export models with added associations
module.exports = {Restaurant, Menu, Item, sequelize}