const Joi = require('joi')
const express = require('express')
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000

const courses = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Science'}
]

///Server

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})


///Get requests 

app.get('/', (request,response) => {
    response.send('Hello World!')
})

app.get('/api/courses', (request,response) => {
    response.send(courses)
})

app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(course => course.id == request.params.id )
    if (!course) response.status(404).send("The course with the given ID was not found")
    response.send(course)
})

//Post Requests 

app.post('/api/courses', (request,response) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(request.body, schema)
    console.log(result)
    
   if(result.error){
       response.status(400).send(result.error.details[0].message)
   }
    
    const course = {
        id: courses.length + 1,
        name: request.body.name
    }
    courses.push(course);
    response.send(course)
})