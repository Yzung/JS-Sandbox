import express from 'express'
import { handleGetAllUsers, handleCreateUser } from './user.controller.mjs'

const router = express.Router()

router.get('/', handleGetAllUsers)
router.post('/', handleCreateUser)

export default router