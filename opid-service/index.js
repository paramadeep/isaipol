import express from 'express'
// import url from 'url'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
// import { authorizationUrl, getEmail, getToken } from './auth'

const logger = morgan('dev')
const app = express()
const upload = multer()
const domainData = {}
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
const handleMissingRoute = (req, res) => {
  console.log('the following request is not handled')
  res.send(400)
}
const clearOldData = () => {
  const fiveSecondBefore = new Date().getTime() - 5000
  Object.keys(domainData)
    .filter((time) => time <= fiveSecondBefore)
    .forEach((time) => delete domainData[time])
}
const handleErrors = (err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}

app.use(logger)
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const assetsPath = path.join(__dirname, '../build')
console.log('assetsPath')
console.log(assetsPath)
app.use(express.static(assetsPath))
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
app.use(handleMissingRoute)
app.use(handleErrors)
app.listen(3001, () => {
  console.log('started server')
  console.log('open http://localhost:3001 in your browser')
})
