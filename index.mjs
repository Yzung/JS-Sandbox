import express from 'express'
import dotenv from 'dotenv'
import router from './src/modules/controllers/user.routes.mjs'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())          
app.use('/api/users', router)     

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
