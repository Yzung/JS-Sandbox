// src/modules/user/user.controller.mjs
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
