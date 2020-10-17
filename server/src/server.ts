import express from 'express'
import path from 'path'
import cors from 'cors'

import 'express-async-errors'

import './database/connection'
import routes from './routes'
import errorHandler from './errors/handler'


const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

//GET = listar
//POST = criar
//PUT = editar
//DELETE kk

//query params = {url}/users?search=xvideos  || request.query
//route params = {url}/users/2 -> 2 = id     || request.params
//body = {url}/users -> {"name":"Ryan"...}   || request.body

app.listen(3333)