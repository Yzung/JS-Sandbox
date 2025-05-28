import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swaggerConfig.mjs'
import userRoutes from './src/modules/user/user.routes.mjs'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Rota Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas da API
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`)
})
