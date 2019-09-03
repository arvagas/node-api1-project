// implement your API here
const express = require('express')

const server = express()

server.listen(5000, () => {
  console.log(`Server running at http://localhost:5000/`);
})