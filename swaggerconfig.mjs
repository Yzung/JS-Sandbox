import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Domus API',
    version: '1.0.0',
    description: 'Documentação da API Domus (Gestão Doméstica Pessoal)',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/modules/controllers/user/*.mjs']
}

export const swaggerSpec = swaggerJSDoc(options)
