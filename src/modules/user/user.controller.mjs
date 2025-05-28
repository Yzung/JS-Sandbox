
import { getAllUsers, createUser } from './user.service.mjs'

export async function handleGetAllUsers(req, res) {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

export async function handleCreateUser(req, res) {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação ou dados inválidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - sobrenome
 *         - hashSenha
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Primeiro nome do usuário
 *         sobrenome:
 *           type: string
 *           description: Sobrenome do usuário
 *         hashSenha:
 *           type: string
 *           description: Senha criptografada
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         atualizadoEm:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 */
