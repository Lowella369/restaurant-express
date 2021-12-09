const express = require('express')
const path = require('path') //node native module
const { MenuItems } = require('../restaurant')
// const { Menu } = require('./models/Menu')
// const { Restaurant } = require('./models/Restaurant')
// const {Item} = require('./models/Item')
const {Restaurant, Menu, Item} = require('./models/index') 

const app = express()
const port = 8000

//points toward folder of static files
app.use(express.static(path.join(__dirname, 'public')))

//GET method on /restaurants route returns all restaurants
app.get('/restaurants', async (req,res) => {
    //find all instances of the Model Restaurant
    const allRestaurants = await Restaurant.findAll()
    //respond with allRestaurants as a json objeect
    res.json(allRestaurants)
})

//GET method on /menus route returns all menus
app.get('/menus', async (req,res) => {
    //find all instances of the Model Menu
    const allMenu = await Menu.findAll()
    //respond with menus as a json objeect
    res.json(allMenu)
})

//return specific menu
app.get('/menus/:id', async(req, res) => {
    //find one specific instances of the menu model
    const thisMenu = await Menu.findByPk(req.params.id)

    //respond with specific json object
    res.json(thisMenu)
})

//resturn menu by title
app.get('/menus-name/:name', async(req, res) => {
    //find one specific instances of the menu model
    const thisMenuTitle = await Menu.findOne({
        where: {
            title: req.params.name
        }
    })
    

    //respond with specific json object
    res.json(thisMenuTitle)
})

app.get('/items', async (req, res) => {
    const allItems = await Item.findAll()

    res.json(allItems)
})

//join query 2 models
app.get('/restmenu', async (req, res) => {
    const thisRestMenu = await Menu.findAll({ include: Restaurant })

    res.json(thisRestMenu)
})

//join query 3 models
// app.get('/restmenuitems', async (req, res) => {
//     const thisRestMenu = await MenuItems.findAll({ include: {Restaurant}, include: {MenuItems} })

//     res.json(thisRestMenu)
// })

//route param join query by menu id
app.get('/restmenu/:id', async (req, res) => {
    const thisRestMenu = await Menu.findAll({ 
        include: Restaurant,
        where: {
            id: req.params.id
        }
    })

    res.json(thisRestMenu)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})