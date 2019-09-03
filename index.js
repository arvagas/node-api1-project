const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

//GET REQUEST
server.get('/api/users', (req,res) => {
    db.find()
    .then(users => res.json(users))
    .catch(err => {
        res.status(500).json({
            error: 'The users information could not be retrieved.'
        })
    })
})

//GET REQUEST BY USER ID
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

server.listen(5000, () => {
    console.log(`Server running at http://localhost:5000/`);
})