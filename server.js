const express = require('express')
const path = require('path') //node native module

const {Restaurant, Menu, Item} = require('./models/index') 

//configure express app
const app = express()
const port = 8000

//points toward folder of static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Restaurant model
//create new restaurant
app.post('/restaurants', async(req, res) => {
    //create a restaurant using the json object passed in the request body
    let newRestaurant = await Restaurant.create(req.body)
    
    //send a response string
    res.send(`Restaurant id: ${req.body.id} has successfully created!`)
})

//GET method on /restaurants route 
//returns all restaurants
app.get('/restaurants', async (req,res) => {
    //find all instances of the Model Restaurant
    const allRestaurants = await Restaurant.findAll()

    //respond with allRestaurants as a json object
    res.json(allRestaurants)
})

//returns specific instance of restaurant by id
app.get('/restaurants/:id', async(req, res) => {
    const thisRestaurant = await Restaurant.findByPk(req.params.id)
    res.send(thisRestaurant)
})

//returns specific restaurant by name
app.get('/restaurants-name/:name', async(req, res) => {
    //find one specific instances of the restaurant model
    const thisRestaurant = await Restaurant.findOne({
        where: {
            name: req.params.name
        }
    })

    //respond with specific json object
    res.json(thisRestaurant)
})

//update one Restaurant by id
app.put('/restaurants/:id', async(req, res) => {
    let updateRestaurant = await Restaurant.update(req.body, {
        where: { id: req.params.id}
    })
    res.send(`Restaurant id: ${req.params.id} has successfully updated!`)
})

//delete specific restaurant
app.delete('/restaurants/:id', async(req, res) => {
    await Restaurant.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Restaurant id: ${req.params.id} has successfully deleted!`)
})
//END

//Menu model
//create new menu
app.post('/menus', async(req, res) => {
    //create a menu using the json object passed in the request body
    let newMenu = await Menu.create(req.body) 

    //send a respond string
    res.send(`Menu id: ${req.body.id} has successfully created!`)
})

//GET method on /menus route returns all menus
app.get('/menus', async (req,res) => {
    //find all instances of the Model Menu
    const allMenu = await Menu.findAll()

    //respond with menus as a json object
    res.json(allMenu)
})

//return specific menu
app.get('/menus/:id', async(req, res) => {
    //find one specific instances of the menu model
    const thisMenu = await Menu.findByPk(req.params.id)

    //respond with specific json object
    res.json(thisMenu)
})

//return menu by title
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

//update one menu by id
app.put('/menus/:id', async(req, res) => {

    let updatedMenu = await Menu.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.send(`Menu id: ${req.body.id} has successfully updated!`)
})

//delete one menu by id
app.delete('/menus/:id', async(req, res) => {
    await Menu.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Menu id: ${req.params.id} has successfully deleted!`)
})

//Item Model
//create new Item
app.post('/items', async(req,res) => {
    //create an item using the  json object passed in the request body
    await Item.create(req.body)

    //respond string
    res.send(`Item id: ${req.body.id} has successfully created!`)
})

//get method on /items route
//return all menu items
app.get('/items', async (req, res) => {
    //find all instances of the item model
    const allItems = await Item.findAll()

    res.json(allItems)
})

//return specific item
app.get('/items/:id', async (req, res) => {
    //find one instance of the item model
    const thisItem = await Item.findOne({ 
        where: {
            id: req.params.id
        }
    })

    res.json(thisItem)
})

//update one menu item by id
app.put('/items/:id', async(req, res) => {
    let updateItem = await Item.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.send(`Item id: ${req.params.id} has successfully updated!`)
})

//delete one menu item by id
app.delete('/items/:id', async(req, res) => {
    await Item.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Item id: ${req.params.id} has successfully deleted!`)
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
/////END

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})