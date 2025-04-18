const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const WishModel = require('./module/wish')


const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/Wishlist_Manager')

app.delete("/Delete/:id" ,(req , res) =>{
    const id = req.params.id;
    WishModel.findByIdAndDelete({_id:id})
    .then(wish => res.json(wish))
    .catch(err => res.json(err))
})

app.put("/wishUpdate/:id", (req , res) =>{
    const id = req.params.id;
    WishModel.findByIdAndUpdate({_id:id},
    {

        itemName: req.body.itemName,
        description: req.body.description,
        link: req.body.link,
        priority: req.body.priority,
        createdAt: req.body.createdAt

    })
    .then(wish => res.json(wish))
    .catch(err => res.json(err))
})

app.get("/getWish/:id", (req , res) =>{
    const id = req.params.id;
    WishModel.findById({_id:id})
    .then(wish => res.json(wish))
    .catch(err => res.json(err))
})

app.get("/", (req , res) =>{
    WishModel.find({})
    .then(wish => res.json(wish))
    .catch(err => res.json(err))
})

app.post("/createWish", (req , res) =>{
    WishModel.create(req.body)
    .then(wish => res.json(wish))
    .catch(err => res.json(err))
})



app.listen (3001,() =>{
    console.log("Server is Running")
})