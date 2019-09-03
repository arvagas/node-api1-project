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
server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params

    //Has errors. Better way to retrieve and display data that has been removed?
    const delUser = db.findById(id).then(user => res.json(user))

    db.remove(id)
    .then(user => {
        user ? res.json(delUser) : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: 'The user could not be removed.'
        })
    })
})

//PUT request
server.put('/api/users/:id', (req,res) => {
    const { id } = req.params
    const changes = req.body

    db.update(id, changes)
    .then(user => {
        if (user) {
            if (changes.name === undefined || changes.bio === undefined) {
                res.status(400).json({
                    errorMessage: 'Please provide name and bio for the user.'
                })
            } else {
                res.json({
                    ...changes,
                    id: id
                })
            }
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: 'The user information could not be modified.'
        })
    })
})

server.listen(5000, () => {
    console.log(`Server running at http://localhost:5000/`);
})