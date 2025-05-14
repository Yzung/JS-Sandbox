import express from 'express'
import dotenv from 'dotenv'
import oauth2 from './src/modules/oauth2/oauth2.js'
import { join } from 'path'

dotenv.config()
const PORT = process.env.PORT
const app = express()
const router = express.Router();

app.use('/', router)
app.use(express.static('public'))
app.listen(PORT, () => {console.log('http://localhost:3000')})

router.post('/auth/google', oauth2)

router.get('/dash', (req, res) => {
  res.sendFile(join(process.cwd(), './front-test/dash.html'))
})

router.get('/', (req, res) => {
  res.sendFile(join(process.cwd(), './front-test/index.html'))
})