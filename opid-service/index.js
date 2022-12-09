import express from 'express'
import url from 'url'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import { authorizationUrl, getEmail, getToken } from './auth'

const logger = morgan('dev')
const app = express()
const upload = multer()
const domainData = {}
app.use(logger)

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function clearOldData() {
  const fiveSecondBefore = new Date().getTime() - 5000
  Object.keys(domainData)
    .filter((time) => time <= fiveSecondBefore)
    .forEach((time) => delete domainData[time])
}

app.post('/local-file', upload.single('file'), (req, res) => {
  const domain = req.file.buffer.toString()
  const domainRef = new Date().getTime() + Math.floor(Math.random() * 1000)
  domainData[domainRef] = domain
  res.send({ domainRef })
})

app.get('/domain/:domainRef', (req, res) => {
  const domain = domainData[req.params.domainRef]
  res.attachment('domain.js')
  res.type('js')
  res.send(domain)
  delete domainData[req.params.domainRef]
  clearOldData()
})

app.get('/', (req, res) => {
  res.redirect(authorizationUrl)
})

app.get('/oauth2callback', async (req) => {
  const q = url.parse(req.url, true).query
  const { tokens } = await getToken(q.code)
  const email = await getEmail(tokens)
  console.log(email)
})

app.listen(3001, () => {
  console.log('started server')
})
