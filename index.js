const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

//GET request
server.get('/api/users', (req,res) => {
    db.find()
    .then(users => res.json(users))
    .catch(err => {
        res.status(500).json({
            error: 'The users information could not be retrieved.'
        })
    })
})

//GET request by user ID
server.get('/api/users/:id', (req,res) => {
    const { id } = req.params

    db.findById(id)
    .then(user => {
        user ? res.json(user) : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: 'The user information could not be retrieved.'
        })
    })
})

//POST request
server.post('/api/users', (req,res) => {
    const userCheck = req.body

    if (userCheck.name === undefined || userCheck.bio === undefined) {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user'
        })
    } else {
        db.insert(userCheck)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was an error while saving the user to the database'
            })
        })
    }
})

//DELETE request
//Note: Should be returning the deleted user info. Bug in the database?
server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params

    db.remove(id)
    .then(user => {
        user ? res.json(user) : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: 'The user could not be removed.'
        })
    })
})

server.listen(5000, () => {
    console.log(`Server running at http://localhost:5000/`);
})