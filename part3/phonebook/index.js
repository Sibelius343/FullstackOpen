require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('pBody', (request) => {
    return JSON.stringify(request.body)
})

const custMorgan = morgan(
    ':method :url :status :res[content-length] - :response-time ms :pBody'
)

app.use(custMorgan)

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(people => {
            response.send(
                `<p>The phonebook has info for ${people.length} people</p>
                <p>${new Date().toString()}</p>`
            )
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number
    }
    const opts = {
        new: true,
        runValidators: true
    }
    Person.findByIdAndUpdate(request.params.id, person, opts)
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // console.log(request)
    if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }
    if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'Name already in phonebook'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(result => {
            console.log(`${person.name} saved!`)
            response.json(result)
        })
        .catch(error => next(error))

    /*
    const newId = Math.floor(Math.random() * 9999 + 1)
    const person = {
        name: body.name,
        number: body.number,
        id: newId
    }

    persons = persons.concat(person)
    response.json(person)
    */
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})