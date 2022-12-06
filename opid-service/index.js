import express from 'express'
import url from 'url'
import morgan from 'morgan'
import { authorizationUrl, getEmail, getToken } from './auth'
// import { google } from 'googleapis'
const logger = morgan('dev')
const app = express()

app.use(logger)

app.get('/', (req, res) => {
  console.log('in base')
  res.redirect(authorizationUrl)
})

app.get('/oauth2callback', async (req) => {
  console.log('in callback')
  const q = url.parse(req.url, true).query
  const { tokens } = await getToken(q.code)
  console.log(tokens.id_token)
  const email = await getEmail(tokens)
  console.log(email)
})

app.listen(3000, () => {
  console.log('started server')
})
