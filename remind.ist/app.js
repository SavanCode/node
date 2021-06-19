// const run=()=>{
//     console.log('run pump those crazy legs!!')
// }
// run()

// require('dotenv').config() 

// const {createServer} = require('http')

// const PORT=process.env.PORT || 1234
// //const PORT=1234
// const server = createServer((request,response)=>{
//     return response.end('Look,this is the response!')
// })

// server.listen(PORT,()=>{
//     console.log(`we are running on port ${PORT}`)
// })

const server = require('./initialisers/http')
server()